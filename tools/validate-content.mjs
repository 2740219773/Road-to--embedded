#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.argv[2] ?? process.cwd());
const errors = [];
const warnings = [];

function rel(file) {
  return path.relative(root, file).replaceAll(path.sep, "/");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(directory) {
  const result = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...walk(full));
    else result.push(full);
  }
  return result;
}

function resolveLocalLink(sourceFile, target) {
  const clean = target.trim().replace(/^<|>$/g, "").split(/\s+/)[0];
  if (!clean || clean.startsWith("#") || /^(?:https?:|mailto:|javascript:)/i.test(clean)) {
    return { ignored: true };
  }

  const withoutAnchor = clean.split("#", 1)[0].split("?", 1)[0];
  if (!withoutAnchor) return { ignored: true };

  const candidate = path.resolve(path.dirname(sourceFile), withoutAnchor);
  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return { ok: true };
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
    const readme = path.join(candidate, "README.md");
    if (fs.existsSync(readme)) return { ok: true };
  }
  return { ok: false, target: clean, resolved: rel(candidate) };
}

const corePaths = [
  "README.md",
  "PROJECT.md",
  "ROADMAP.md",
  "CONTRIBUTING.md",
  "01-Knowledge-Base",
  "02-Learning-Path",
  "03-Interactive-Labs",
  "04-Missions",
  "05-Projects",
  "06-Debugging-Cases",
  "07-OpenMAIC",
  "09-Progress/Current.md",
  "09-Progress/BEGINNER-WALKTHROUGH-V2.6.md",
  "02-Learning-Path/START-HERE.md",
  "02-Learning-Path/00-Programming-Warmup/README.md",
  "02-Learning-Path/00-Programming-Warmup/examples/README.md",
  "02-Learning-Path/00-Programming-Warmup/examples/hello.c",
  "docs/BEGINNER-SETUP.md",
  "docs/LEARNING-RECORD-TEMPLATE.md",
  "docs/V2.7-BEGINNER-QUALITY-GATE.md",
  "01-Knowledge-Base/C/10-C-Basics-for-Beginners.md",
  "02-Learning-Path/Stage-01-C-and-Memory/C-BASICS-CHECK.md",
  "02-Learning-Path/Stage-02-MCU-Rookie/HARDWARE-SETUP.md",
  "02-Learning-Path/Stage-02-MCU-Rookie/RECOVERY-GUIDE.md",
  "01-Knowledge-Base/Debugging/00-Instrument-Basics.md",
  "02-Learning-Path/route-manifest.json",
  "tools/validate-content.mjs",
  "docs/QUALITY-GATES.md",
  "docs/V2.4-QUALITY-GATE.md",
  "docs/V2.5-QUALITY-GATE.md",
  "docs/V2.7-BEGINNER-QUALITY-GATE.md",
  ".gitignore",
  "LICENSE-CONTENT.md",
  "LICENSE-CODE.md",
  ".github/workflows/content-quality.yml",
  "07-OpenMAIC/manifest.json"
];

for (const item of corePaths) {
  if (!exists(item)) errors.push(`Missing core path: ${item}`);
}

const allFiles = walk(root);
const markdownFiles = allFiles.filter((file) => file.endsWith(".md"));
let checkedLinks = 0;

for (const file of markdownFiles) {
  const text = fs.readFileSync(file, "utf8");
  const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
  for (const match of text.matchAll(linkPattern)) {
    const result = resolveLocalLink(file, match[1]);
    if (result.ignored) continue;
    checkedLinks += 1;
    if (!result.ok) {
      errors.push(`Broken link: ${rel(file)} -> ${result.target} (resolved ${result.resolved})`);
    }
  }
}

const currentStateFiles = [
  "README.md",
  "PROJECT.md",
  "ROADMAP.md",
  "docs/DEVELOPMENT-PLAN.md",
  "09-Progress/Current.md",
  "02-Learning-Path/README.md"
];

const stalePatterns = [
  /ready for merge/i,
  /PR #4 Ready for Review/i,
  /Phase B.*最终质量验收/i,
  /当前正在完成.*Phase B/i,
  /Phase B 合并后进入 V2\.4/i
];

for (const file of currentStateFiles) {
  const text = read(file);
  for (const pattern of stalePatterns) {
    if (pattern.test(text)) {
      errors.push(`Stale current-state wording: ${file} matches ${pattern}`);
    }
  }
}

if (!/START-HERE\.md/i.test(read("README.md")) || !/START-HERE\.md/i.test(read("02-Learning-Path/README.md"))) {
  errors.push("Root README and Learning Path README must link to START-HERE.md");
}

for (const beginnerPath of [
  "docs/BEGINNER-SETUP.md",
  "docs/LEARNING-RECORD-TEMPLATE.md",
  "02-Learning-Path/00-Programming-Warmup/examples/README.md",
  "02-Learning-Path/00-Programming-Warmup/examples/hello.c",
  "02-Learning-Path/Stage-02-MCU-Rookie/HARDWARE-SETUP.md",
  "02-Learning-Path/Stage-02-MCU-Rookie/RECOVERY-GUIDE.md",
  "01-Knowledge-Base/Debugging/00-Instrument-Basics.md"
]) {
  if (!exists(beginnerPath)) errors.push(`Beginner route support path missing: ${beginnerPath}`);
}

if (!/BEGINNER-SETUP\.md/i.test(read("02-Learning-Path/START-HERE.md"))) {
  errors.push("START-HERE.md must link to the beginner setup guide");
}
if (!/examples\/README\.md/i.test(read("02-Learning-Path/00-Programming-Warmup/README.md"))) {
  errors.push("Programming Warmup must link to runnable examples");
}
if (!/HARDWARE-SETUP\.md/i.test(read("02-Learning-Path/Stage-02-MCU-Rookie/README.md"))) {
  errors.push("Stage 02 README must link to Hardware Setup");
}

for (const file of currentStateFiles) {
  if (!/V2\.7.*Beginner Framework.*Quality Gate/i.test(read(file))) {
    errors.push(`Current-state document missing V2.7 Beginner Framework Quality Gate status: ${file}`);
  }
}

const currentProgress = read("09-Progress/Current.md");
if (!/V2\.5.*Stage 05 RTOS Engineer.*(?:in progress|completed|已完成)/i.test(currentProgress)) {
  errors.push("Current progress must identify V2.5 Stage 05 RTOS Engineer status");
}
if (/V2\.5.*Stage 05 RTOS Engineer.*completed/i.test(currentProgress) && !/Stage 05 host fixture regression:\s*PASS/i.test(currentProgress)) {
  errors.push("Completed V2.5 Stage 05 status requires recorded Host Fixture PASS evidence");
}
if (/当前正在进行\s+\*\*V2\.3/i.test(read("PROJECT.md"))) {
  errors.push("PROJECT.md still identifies V2.3 as the current work");
}

const routeManifestFile = "02-Learning-Path/route-manifest.json";
let routeManifest;
try {
  routeManifest = JSON.parse(read(routeManifestFile));
} catch (error) {
  errors.push(`Invalid learning route manifest JSON: ${error.message}`);
}

function routeTargetExists(item, baseDirectory = path.join(root, "02-Learning-Path")) {
  if (item === null) return true;
  if (typeof item !== "string" || item.length === 0) return false;
  const clean = item.split("#", 1)[0].split("?", 1)[0];
  const candidate = path.resolve(baseDirectory, clean);
  if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return true;
  if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
    return fs.existsSync(path.join(candidate, "README.md"));
  }
  return false;
}

if (routeManifest) {
  if (routeManifest.schemaVersion !== 1) errors.push("Learning route manifest schemaVersion must be 1");
  if (!routeTargetExists(routeManifest.entry)) errors.push(`Learning route entry does not exist: ${routeManifest.entry}`);
  for (const item of routeManifest.preparation ?? []) {
    if (!routeTargetExists(item)) errors.push(`Learning route preparation path does not exist: ${item}`);
  }

  const stages = Array.isArray(routeManifest.stages) ? routeManifest.stages : [];
  if (stages.length !== 9) errors.push("Learning route manifest must contain Stage 00 through Stage 08");
  const expectedIds = stages.map((stage) => stage.id);
  if (expectedIds.join(",") !== "00,01,02,03,04,05,06,07,08") {
    errors.push("Learning route stages must be ordered from 00 through 08");
  }

  for (const stage of stages) {
    for (const field of ["id", "status", "entry", "required", "missions", "labs", "boss", "exit", "next", "nextEntry", "environment", "estimatedSessions", "requiredOutputs", "requiredTools", "blockers"]) {
      if (!(field in stage)) errors.push(`Learning route Stage ${stage.id ?? "<unknown>"} missing field: ${field}`);
    }
    if (!routeTargetExists(stage.entry)) errors.push(`Learning route entry does not exist: ${stage.entry}`);
    const stageBaseDirectory = path.dirname(path.resolve(root, "02-Learning-Path", stage.entry));
    for (const field of ["required", "missions", "labs"]) {
      if (!Array.isArray(stage[field])) {
        errors.push(`Learning route Stage ${stage.id} field ${field} must be an array`);
      } else {
        for (const item of stage[field]) {
          if (!routeTargetExists(item, stageBaseDirectory)) errors.push(`Learning route Stage ${stage.id} path does not exist: ${item}`);
        }
      }
    }
    if (stage.status === "formal") {
      if (!Array.isArray(stage.missions) || stage.missions.length === 0) errors.push(`Formal Stage ${stage.id} must declare at least one Mission`);
      if (!routeTargetExists(stage.boss, stageBaseDirectory)) errors.push(`Formal Stage ${stage.id} Boss path does not exist: ${stage.boss}`);
      if (!routeTargetExists(stage.exit, stageBaseDirectory)) errors.push(`Formal Stage ${stage.id} Exit path does not exist: ${stage.exit}`);
      if (!Number.isInteger(stage.estimatedSessions) || stage.estimatedSessions <= 0) errors.push(`Formal Stage ${stage.id} must declare positive estimatedSessions`);
      for (const field of ["requiredOutputs", "requiredTools", "blockers"]) {
        if (!Array.isArray(stage[field]) || stage[field].length === 0) errors.push(`Formal Stage ${stage.id} must declare non-empty ${field}`);
      }
      if (!stage.nextEntry || !routeTargetExists(stage.nextEntry)) errors.push(`Formal Stage ${stage.id} must declare a valid nextEntry`);
    }
    if (stage.status === "prototype") {
      const stageText = read(path.relative(root, path.resolve(root, "02-Learning-Path", stage.entry)));
      if (!/prototype/i.test(stageText)) errors.push(`Prototype Stage ${stage.id} must be explicitly labeled prototype`);
    }
  }

  for (let index = 0; index < stages.length - 1; index += 1) {
    if (stages[index].next !== stages[index + 1].id) {
      errors.push(`Learning route Stage ${stages[index].id} must point to Stage ${stages[index + 1].id}`);
    }
  }
  if (stages.at(-1)?.next !== null) errors.push("Learning route Stage 08 next must be null");
}

const stage04MissionFiles = [
  "04-Missions/Stage-04-Debug-Hunter/01-Fault-Scene/Mission.md",
  "04-Missions/Stage-04-Debug-Hunter/02-Who-Wrote-It/Mission.md",
  "04-Missions/Stage-04-Debug-Hunter/03-Choose-The-Instrument/Mission.md"
];
const stage04MissionRequirements = [
  [/^##\s+Predict/im, "Predict"],
  [/^##\s+Explore\s*\/\s*Observe/im, "Explore / Observe"],
  [/^##\s+Action/im, "Action"],
  [/^##\s+Break It/im, "Break It"],
  [/^##\s+Debug with Evidence/im, "Debug with Evidence"],
  [/^##\s+Transfer\s*\/\s*Boss/im, "Transfer / Boss"],
  [/^##\s+Review\s*\/\s*Exit/im, "Review / Exit"]
];
for (const item of stage04MissionFiles) {
  const text = read(item);
  for (const [pattern, label] of stage04MissionRequirements) {
    if (!pattern.test(text)) errors.push(`Stage 04 Mission missing ${label}: ${item}`);
  }
}

const stage04CaseFiles = [
  "06-Debugging-Cases/HardFault-Bad-Pointer/CASE.md",
  "06-Debugging-Cases/Interrupt-Storm/CASE.md",
  "06-Debugging-Cases/Stack-Overflow/CASE.md"
];
const stage04CaseRequirements = [
  [/^##\s+Symptom/im, "Symptom"],
  [/^##\s+Context/im, "Context"],
  [/^##\s+Evidence/im, "Evidence"],
  [/^##\s+Hypotheses/im, "Hypotheses"],
  [/^##\s+Experiments/im, "Experiments"],
  [/^##\s+Root Cause/im, "Root Cause"],
  [/^##\s+Fix/im, "Fix"],
  [/^##\s+Verification/im, "Verification"],
  [/^##\s+Prevention/im, "Prevention"]
];
for (const item of stage04CaseFiles) {
  const text = read(item);
  for (const [pattern, label] of stage04CaseRequirements) {
    if (!pattern.test(text)) errors.push(`Stage 04 Debug Case missing ${label}: ${item}`);
  }
}

const stage04RequiredPaths = [
  "02-Learning-Path/Stage-04-Debug-Hunter/EXIT-CHECK.md",
  "03-Interactive-Labs/Debug-Evidence-Workbench/index.html",
  "03-Interactive-Labs/Debug-Evidence-Workbench/README.md",
  "06-Debugging-Cases/Stage-04-Mixed-Failures/CASE.md",
  "05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/firmware/README.md",
  "05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/firmware/broken_firmware.c",
  "05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/firmware/broken_firmware.h",
  "05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/firmware/test_broken_firmware.c",
  "05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/evidence/uart-clock.md",
  "05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/evidence/interrupt-storm.md",
  "05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/evidence/pointer-memory.md",
  "05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/evidence/dma-boundary.md",
  "05-Projects/Intermediate/Stage-04-Boss-Broken-Firmware/evidence/stack-overflow.md"
];
for (const item of stage04RequiredPaths) {
  if (!exists(item)) errors.push(`Stage 04 required path missing: ${item}`);
}

const stage05MissionFiles = [
  "04-Missions/Stage-05-RTOS/01-Race-Condition/Mission.md",
  "04-Missions/Stage-05-RTOS/02-Priority-Inversion/Mission.md",
  "04-Missions/Stage-05-RTOS/03-Deadlock/Mission.md",
  "04-Missions/Stage-05-RTOS/04-Queue-Is-Full/Mission.md"
];
const stage05MissionRequirements = [
  [/^##\s+Hook/im, "Hook"],
  [/^##\s+Goal/im, "Goal"],
  [/^##\s+Predict/im, "Predict"],
  [/^##\s+Explore\s*\/\s*Observe/im, "Explore / Observe"],
  [/^##\s+Action/im, "Action"],
  [/^##\s+Break It/im, "Break It"],
  [/^##\s+Debug with Evidence/im, "Debug with Evidence"],
  [/^##\s+Transfer\s*\/\s*Boss/im, "Transfer / Boss"],
  [/^##\s+Review\s*\/\s*Exit/im, "Review / Exit"]
];
for (const item of stage05MissionFiles) {
  const text = read(item);
  for (const [pattern, label] of stage05MissionRequirements) {
    if (!pattern.test(text)) errors.push(`Stage 05 Mission missing ${label}: ${item}`);
  }
}

const stage05CaseFiles = [
  "06-Debugging-Cases/RTOS-Race-Lost-Update/CASE.md",
  "06-Debugging-Cases/RTOS-Priority-Inversion/CASE.md",
  "06-Debugging-Cases/RTOS-Deadlock/CASE.md",
  "06-Debugging-Cases/RTOS-Queue-Overflow/CASE.md"
];
const stage05CaseRequirements = [
  [/^##\s+Symptom/im, "Symptom"],
  [/^##\s+Context/im, "Context"],
  [/^##\s+Evidence/im, "Evidence"],
  [/^##\s+Hypotheses/im, "Hypotheses"],
  [/^##\s+Experiments/im, "Experiments"],
  [/^##\s+Root Cause/im, "Root Cause"],
  [/^##\s+Fix/im, "Fix"],
  [/^##\s+Verification/im, "Verification"],
  [/^##\s+Prevention/im, "Prevention"],
  [/^##\s+Learning Links/im, "Learning Links"]
];
for (const item of stage05CaseFiles) {
  const text = read(item);
  for (const [pattern, label] of stage05CaseRequirements) {
    if (!pattern.test(text)) errors.push(`Stage 05 Debug Case missing ${label}: ${item}`);
  }
}

const stage05RequiredPaths = [
  "02-Learning-Path/Stage-05-RTOS-Engineer/EXIT-CHECK.md",
  "03-Interactive-Labs/RTOS-Concurrency-Workbench/index.html",
  "03-Interactive-Labs/RTOS-Concurrency-Workbench/README.md",
  "06-Debugging-Cases/Stage-05-Mixed-Concurrency/CASE.md",
  "05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/host/README.md",
  "05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/host/rtos_fixture.h",
  "05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/host/rtos_fixture.c",
  "05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/host/test_rtos_fixture.c",
  "05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/evidence/race.md",
  "05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/evidence/priority-inversion.md",
  "05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/evidence/deadlock.md",
  "05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/evidence/queue-overflow.md",
  "05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/evidence/isr-stack.md",
  "05-Projects/Intermediate/Stage-05-Boss-RTOS-Refactor/evidence/system-map.md"
];
for (const item of stage05RequiredPaths) {
  if (!exists(item)) errors.push(`Stage 05 required path missing: ${item}`);
}

const stage05Workbench = read("03-Interactive-Labs/RTOS-Concurrency-Workbench/index.html");
for (const [pattern, label] of [
  [/Scheduler \/ Priority/i, "Scheduler / Priority mode"],
  [/Race/i, "Race mode"],
  [/Deadlock/i, "Deadlock mode"],
  [/Queue \/ ISR \/ Stack/i, "Queue / ISR / Stack mode"],
  [/role=["']status["']/i, "status region"],
  [/aria-live=/i, "aria-live feedback"],
  [/localStorage/i, "local Evidence Record"]
]) {
  if (!pattern.test(stage05Workbench)) errors.push(`Stage 05 Workbench missing ${label}`);
}

const formalMissionPatterns = [
  [/预测|predict/i, "Predict"],
  [/观察|observe|visualize|操作|action/i, "Action / Observe"],
  [/故障|错误|break it|failure/i, "Break It / Failure"],
  [/调试|debug|证据|evidence/i, "Debug / Evidence"],
  [/验收|报告|记录|achievement|transfer|迁移|review|exit/i, "Transfer / Review / Exit"]
];

const formalMissionBeginnerRequirements = [
  [/^##\s+Beginner Guide/im, "beginner prerequisites"],
  [/^##\s+(?:Mission Goal|Goal|Mission Brief|Hook)/im, "mission goal or hook"],
  [/^##\s+(?:What to Submit)/im, "What to Submit"],
  [/^##\s+(?:If You Are Stuck)/im, "If You Are Stuck"],
  [/^##\s+(?:Ready to Continue)/im, "Ready to Continue"],
  [/LEARNING-RECORD-TEMPLATE\.md/i, "Learning Record Template link"]
];

if (routeManifest) {
  for (const stage of routeManifest.stages.filter((item) => item.status === "formal")) {
    const stageBaseDirectory = path.dirname(path.resolve(root, "02-Learning-Path", stage.entry));
    for (const missionPath of stage.missions) {
      const missionText = fs.readFileSync(path.resolve(stageBaseDirectory, missionPath), "utf8");
      for (const [pattern, label] of formalMissionPatterns) {
        if (!pattern.test(missionText)) errors.push(`Formal Stage ${stage.id} Mission missing ${label}: ${missionPath}`);
      }
      for (const [pattern, label] of formalMissionBeginnerRequirements) {
        if (!pattern.test(missionText)) errors.push(`Formal Stage ${stage.id} Mission missing ${label}: ${missionPath}`);
      }
    }
    for (const labPath of stage.labs) {
      const labText = fs.readFileSync(path.resolve(stageBaseDirectory, labPath), "utf8");
      for (const [pattern, label] of [
        [/解决什么|purpose|作用|理解/i, "Purpose"],
        [/设置|可以|输入|交互|操作|experiment/i, "Interaction"],
        [/mission|任务|navigation/i, "Mission Integration"],
        [/第一次|先.*操作|first.*action|try first/i, "First action"],
        [/观察不到|如果.*没有|stuck|troubleshoot/i, "Troubleshooting guidance"]
      ]) {
        if (!pattern.test(labText)) errors.push(`Formal Stage ${stage.id} Lab missing ${label}: ${labPath}`);
      }
    }
  }
}

const htmlFiles = allFiles.filter((file) =>
  path.basename(file).toLowerCase() === "index.html" &&
  file.includes(`${path.sep}03-Interactive-Labs${path.sep}`)
);

for (const file of htmlFiles) {
  const text = fs.readFileSync(file, "utf8");
  const fileName = rel(file);
  if (!/<!doctype html>/i.test(text)) errors.push(`HTML missing doctype: ${fileName}`);
  if (!/<html\b[^>]*\blang=["'][^"']+["']/i.test(text)) errors.push(`HTML missing lang: ${fileName}`);
  if (!/<meta\b[^>]*name=["']viewport["']/i.test(text)) errors.push(`HTML missing viewport: ${fileName}`);
  if (!/<link\b[^>]*href=["']\.\.\/lab-foundation\.css["']/i.test(text)) {
    errors.push(`HTML missing shared Lab foundation stylesheet: ${fileName}`);
  }
  if (!/aria-live=/i.test(text)) {
    warnings.push(`HTML has no aria-live result region yet: ${fileName}`);
  }
}

const manifestPath = path.join(root, "07-OpenMAIC/manifest.json");
if (fs.existsSync(manifestPath)) {
  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
  } catch (error) {
    errors.push(`Invalid OpenMAIC manifest JSON: ${error.message}`);
  }

  if (manifest) {
    if (manifest.schemaVersion !== 1) errors.push("OpenMAIC manifest schemaVersion must be 1");
    if (!Array.isArray(manifest.courses) || manifest.courses.length === 0) {
      errors.push("OpenMAIC manifest must contain at least one course");
    } else {
      for (const course of manifest.courses) {
        for (const field of ["id", "status", "prompt", "mission", "knowledge", "labs", "expectedScenes", "generatedArtifacts"]) {
          if (!(field in course)) errors.push(`OpenMAIC course ${course.id ?? "<unknown>"} missing field: ${field}`);
        }
        const pathsToCheck = [course.prompt, course.mission, ...(course.knowledge ?? []), ...(course.labs ?? [])];
        for (const item of pathsToCheck) {
          if (typeof item === "string" && !exists(item)) {
            errors.push(`OpenMAIC manifest path does not exist: ${item}`);
          }
        }
      }
    }
  }
}

function advisoryCoverage(files, groups, label) {
  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const missing = groups
      .filter((group) => !group.some(({ pattern }) => pattern.test(text)))
      .map((group) => group[0].source);
    if (missing.length) warnings.push(`${label} advisory: ${rel(file)} missing ${missing.join(", ")}`);
  }
}

const missionFiles = allFiles.filter((file) =>
  file.includes(`${path.sep}04-Missions${path.sep}`) && file.endsWith("Mission.md")
);
advisoryCoverage(missionFiles, [
  [{ pattern: /预测|predict/i, source: "prediction" }],
  [{ pattern: /观察|observe|visualize|操作|action/i, source: "observation/action" }],
  [{ pattern: /故障|错误|break it|failure/i, source: "failure" }],
  [{ pattern: /调试|debug|证据|evidence/i, source: "debug/evidence" }],
  [{ pattern: /验收|报告|记录|achievement|transfer|迁移/i, source: "exit/transfer" }]
], "Mission");

const caseFiles = allFiles.filter((file) =>
  file.includes(`${path.sep}06-Debugging-Cases${path.sep}`) && file.endsWith("CASE.md")
);
advisoryCoverage(caseFiles, [
  [{ pattern: /现象|symptom/i, source: "symptom" }],
  [{ pattern: /证据|evidence/i, source: "evidence" }],
  [{ pattern: /根因|root cause/i, source: "root cause" }],
  [{ pattern: /修复|fix/i, source: "fix" }],
  [{ pattern: /验证|verification|回归|regression/i, source: "verification" }]
], "Debug Case");

const labReadmes = allFiles.filter((file) =>
  file.includes(`${path.sep}03-Interactive-Labs${path.sep}`) && file.endsWith("README.md")
);
advisoryCoverage(labReadmes, [
  [{ pattern: /解决什么|purpose|作用|理解/i, source: "purpose" }],
  [{ pattern: /设置|可以|输入|交互|操作|experiment/i, source: "interaction" }],
  [{ pattern: /mission|任务|navigation/i, source: "mission link" }]
], "Lab");

console.log(`Content validation: ${errors.length} error(s), ${warnings.length} advisory warning(s)`);
console.log(`Checked ${markdownFiles.length} Markdown files, ${checkedLinks} local links, and ${htmlFiles.length} HTML Labs.`);

for (const message of errors) console.error(`ERROR: ${message}`);
for (const message of warnings) console.warn(`WARN: ${message}`);

if (errors.length > 0) process.exitCode = 1;
