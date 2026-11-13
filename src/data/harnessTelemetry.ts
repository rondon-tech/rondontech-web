export interface HarnessComponentItem {
  id: "c1" | "c2" | "c3" | "c4" | "c5" | "c6" | "c7" | "c8";
  name: string;
  opencodePath: string;
  codexPath: string;
  contextScope: "ALWAYS_ON" | "ON_DEMAND" | "TOOL_LOOP";
  runtimeRole: "Context Construction" | "Tool Interface" | "Delegation" | "Middleware";
  demoStatus: "modified" | "active" | "empty_always_on" | "stub";
  demoBytes: number | null;
  description: string;
}

export interface RecursionStepItem {
  mode: "agg" | "seq";
  phase: "BASE" | "PROPOSE_PROBE" | "COMPOSE" | "SELECT" | "REFLECT";
  label: string;
  dim: "BASE" | "INV" | "DOM" | "AGG" | "COMPOSE" | "SELECT" | "REFLECT";
  attempts: number;
  usd: number;
  keptBase: boolean;
  fellBack: boolean;
  executionFailed: boolean;
  outputPreview: string;
  notes: string;
}

export interface ExperienceLessonItem {
  taskId: string;
  mode: "agg" | "seq";
  adoptedLabel: string;
  adoptedRunId: string;
  harnessFingerprint: string;
  whyChosen: string;
  componentEdited: string;
  candidateRef: string;
  changeSummary: string;
  observedContrast: string;
  verdict: "helped" | "no observed effect";
  cue: string;
  lesson: string;
  evidence: string;
  confidence: string;
  componentsSummary: string;
  libraryEntriesBefore: number;
}

export interface DemoTaskComparison {
  taskId: string;
  domain: string;
  sourceFile: string;
  amounts: string[];
  baseOutput: string;
  adoptedOutput: string;
  adoptedAggLabel: string;
  adoptedSeqLabel: string;
  harnessFingerprint: string;
}

export interface DemoRunTelemetry {
  repository: string;
  packageName: string;
  packageVersion: string;
  license: string;
  paperRef: string;
  pythonRuntime: string;
  packageManager: string;
  command: string;
  exitCode: number;
  domain: string;
  kBudget: number;
  rolloutsPerModeTask: number;
  stagesPerModeTask: number;
  tasksCompleted: number;
  tasksFailed: number;
  totalExecutions: number;
  totalEditorCalls: number;
  totalUsdCost: number;
  alwaysOnMaxChars: number;
  adoptedAlwaysOnChars: number;
  editedComponentPath: string;
  baseScriptBytes: number;
  adoptedScriptBytes: number;
  baseScriptContent: string;
  adoptedScriptContent: string;
  unifiedDiff: string;
  taskComparisons: DemoTaskComparison[];
  components: HarnessComponentItem[];
  recursionTrace: RecursionStepItem[];
  experienceLessons: ExperienceLessonItem[];
}

export const HARNESS_TELEMETRY: DemoRunTelemetry = {
  repository: "https://github.com/google-research/harness2",
  packageName: "harness2",
  packageVersion: "0.1.0",
  license: "Apache-2.0",
  paperRef: "arXiv:2610.14224",
  pythonRuntime: "CPython 3.12.16",
  packageManager: "uv 0.13.8",
  command: "harness2-demo --output runs/demo --k 2",
  exitCode: 0,
  domain: "accounting",
  kBudget: 2,
  rolloutsPerModeTask: 8,
  stagesPerModeTask: 6,
  tasksCompleted: 2,
  tasksFailed: 0,
  totalExecutions: 28,
  totalEditorCalls: 32,
  totalUsdCost: 0.0,
  alwaysOnMaxChars: 24000,
  adoptedAlwaysOnChars: 62,
  editedComponentPath: "scripts/summarize.py",
  baseScriptBytes: 257,
  adoptedScriptBytes: 243,
  baseScriptContent: `import csv
import sys
from decimal import Decimal

with open(sys.argv[1]) as source:
    amounts = [Decimal(row['amount']) for row in csv.DictReader(source)]
total = sum((amount for amount in amounts if amount > 0), Decimal(0))
print(f'Total: {total:.2f}')`,
  adoptedScriptContent: `import csv
import sys
from decimal import Decimal

with open(sys.argv[1]) as source:
    amounts = [Decimal(row['amount']) for row in csv.DictReader(source)]
total = sum((amount for amount in amounts), Decimal(0))
print(f'Total: {total:.2f}')`,
  unifiedDiff: `--- current/scripts/summarize.py
+++ inv1/scripts/summarize.py
@@ -4,5 +4,5 @@
 
 with open(sys.argv[1]) as source:
     amounts = [Decimal(row['amount']) for row in csv.DictReader(source)]
-total = sum((amount for amount in amounts if amount > 0), Decimal(0))
+total = sum((amount for amount in amounts), Decimal(0))
 print(f'Total: {total:.2f}')`,
  taskComparisons: [
    {
      taskId: "ledger-1",
      domain: "accounting",
      sourceFile: "sources/ledger-1/ledger.csv",
      amounts: ["100.25", "-20.10", "5.00"],
      baseOutput: "Total: 105.25",
      adoptedOutput: "Total: 85.15",
      adoptedAggLabel: "agg1",
      adoptedSeqLabel: "c1",
      harnessFingerprint: "851f1352f3589138",
    },
    {
      taskId: "ledger-2",
      domain: "accounting",
      sourceFile: "sources/ledger-2/ledger.csv",
      amounts: ["35.50", "-10.25", "-5.00"],
      baseOutput: "Total: 35.50",
      adoptedOutput: "Total: 20.25",
      adoptedAggLabel: "agg2",
      adoptedSeqLabel: "c2",
      harnessFingerprint: "851f1352f3589138",
    },
  ],
  components: [
    {
      id: "c1",
      name: "System Prompt",
      opencodePath: "systemprompt.md",
      codexPath: "AGENTS.md",
      contextScope: "ALWAYS_ON",
      runtimeRole: "Context Construction",
      demoStatus: "active",
      demoBytes: 56,
      description:
        "Persona and core procedure; always in context, competing directly with the model output budget.",
    },
    {
      id: "c2",
      name: "Guardrails",
      opencodePath: "guardrails.md",
      codexPath: "AGENTS.md",
      contextScope: "ALWAYS_ON",
      runtimeRole: "Context Construction",
      demoStatus: "empty_always_on",
      demoBytes: 0,
      description:
        "Always-on behavioral rules and skill autotrigger declarations injected into every turn.",
    },
    {
      id: "c3",
      name: "Memory",
      opencodePath: "LongTermMEMORY.md",
      codexPath: "AGENTS.md",
      contextScope: "ALWAYS_ON",
      runtimeRole: "Context Construction",
      demoStatus: "empty_always_on",
      demoBytes: 0,
      description: "Durable domain facts persisted across task turns.",
    },
    {
      id: "c4",
      name: "Tool Guidance",
      opencodePath: "tool_descriptions/tool_guidance.md",
      codexPath: "AGENTS.md",
      contextScope: "ALWAYS_ON",
      runtimeRole: "Tool Interface",
      demoStatus: "empty_always_on",
      demoBytes: 0,
      description: "Prose guidance governing how tools are invoked and validated.",
    },
    {
      id: "c5",
      name: "Subagents",
      opencodePath: "sub_agents/<name>/AGENT.md",
      codexPath: "sub_agents/<name>/AGENT.md",
      contextScope: "ON_DEMAND",
      runtimeRole: "Delegation",
      demoStatus: "stub",
      demoBytes: null,
      description:
        "Delegated subagents invoked on demand via the task tool in their own isolated context.",
    },
    {
      id: "c6",
      name: "Skills",
      opencodePath: "skills/<name>/SKILL.md",
      codexPath: ".agents/skills/<name>/SKILL.md",
      contextScope: "ON_DEMAND",
      runtimeRole: "Context Construction",
      demoStatus: "stub",
      demoBytes: null,
      description:
        "Reusable workflows loaded on demand via the skill tool to avoid exhausting always-on token budgets.",
    },
    {
      id: "c7",
      name: "Scripts",
      opencodePath: "scripts/<name>.py",
      codexPath: "scripts/<name>.py",
      contextScope: "ON_DEMAND",
      runtimeRole: "Tool Interface",
      demoStatus: "modified",
      demoBytes: 243,
      description:
        "Deterministic Python helpers executed via Bash; scripts/summarize.py was refined in runs/demo to preserve signed ledger amounts.",
    },
    {
      id: "c8",
      name: "Plugins",
      opencodePath: "plugin/<name>.ts",
      codexPath: ".codex/hooks.json",
      contextScope: "TOOL_LOOP",
      runtimeRole: "Middleware",
      demoStatus: "stub",
      demoBytes: null,
      description:
        "Always-registered middleware acting inside the tool loop (tool.execute.after, custom tools, system transform).",
    },
  ],
  recursionTrace: [
    {
      mode: "agg",
      phase: "BASE",
      label: "base1",
      dim: "BASE",
      attempts: 1,
      usd: 0.0,
      keptBase: true,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 105.25",
      notes: "Unmodified base harness rollout on ledger-1 (omitted -20.10 credit).",
    },
    {
      mode: "agg",
      phase: "PROPOSE_PROBE",
      label: "inv1",
      dim: "INV",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Keep signed amounts: the base total omitted credits in the source ledger.",
    },
    {
      mode: "agg",
      phase: "PROPOSE_PROBE",
      label: "dom1",
      dim: "DOM",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Keep signed amounts: the base total omitted credits in the source ledger.",
    },
    {
      mode: "agg",
      phase: "PROPOSE_PROBE",
      label: "inv2",
      dim: "INV",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Keep signed amounts: the base total omitted credits in the source ledger.",
    },
    {
      mode: "agg",
      phase: "PROPOSE_PROBE",
      label: "dom2",
      dim: "DOM",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Keep signed amounts: the base total omitted credits in the source ledger.",
    },
    {
      mode: "agg",
      phase: "COMPOSE",
      label: "agg1",
      dim: "AGG",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Selected parallel composition (A -> agg1) for ledger-1; Jaccard similarity 1.0.",
    },
    {
      mode: "agg",
      phase: "COMPOSE",
      label: "agg2",
      dim: "AGG",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Parallel composition candidate B for ledger-1 (selected as A -> agg2 on ledger-2).",
    },
    {
      mode: "seq",
      phase: "PROPOSE_PROBE",
      label: "inv1",
      dim: "INV",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Sequential step 1 invariant edit: removed positive-only filter.",
    },
    {
      mode: "seq",
      phase: "PROPOSE_PROBE",
      label: "dom1",
      dim: "DOM",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Sequential step 1 domain edit.",
    },
    {
      mode: "seq",
      phase: "COMPOSE",
      label: "c1",
      dim: "COMPOSE",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Sequential step 1 composition (selected as A -> c1 on ledger-1).",
    },
    {
      mode: "seq",
      phase: "PROPOSE_PROBE",
      label: "inv2",
      dim: "INV",
      attempts: 1,
      usd: 0.0,
      keptBase: true,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Sequential step 2 invariant probe; no further delta over c1 (keptBase=true).",
    },
    {
      mode: "seq",
      phase: "PROPOSE_PROBE",
      label: "dom2",
      dim: "DOM",
      attempts: 1,
      usd: 0.0,
      keptBase: true,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Sequential step 2 domain probe; no further delta over c1 (keptBase=true).",
    },
    {
      mode: "seq",
      phase: "COMPOSE",
      label: "c2",
      dim: "COMPOSE",
      attempts: 1,
      usd: 0.0,
      keptBase: true,
      fellBack: false,
      executionFailed: false,
      outputPreview: "Total: 85.15",
      notes: "Sequential step 2 composition (selected as A -> c2 on ledger-2).",
    },
  ],
  experienceLessons: [
    {
      taskId: "ledger-1",
      mode: "agg",
      adoptedLabel: "agg1",
      adoptedRunId: "demo-oc-agg2/ledger-1/agg1",
      harnessFingerprint: "851f1352f3589138",
      whyChosen: "The signed total matches the source ledger.",
      componentEdited: "scripts/summarize.py",
      candidateRef: "inv1",
      changeSummary: "dropped the positive-only filter from the amount sum",
      observedContrast: "the probe total included the credits the base run omitted",
      verdict: "helped",
      cue: "When a ledger includes credits and debits",
      lesson: "Include both signs when summing in scripts/summarize.py.",
      evidence:
        "The scripts/summarize.py row -- removing the positive-only filter changed the probe total to include the credits omitted by the base trajectory.",
      confidence: "high for this observed arithmetic contrast",
      componentsSummary: "1 scripts; 62 always-on chars",
      libraryEntriesBefore: 0,
    },
    {
      taskId: "ledger-2",
      mode: "agg",
      adoptedLabel: "agg2",
      adoptedRunId: "demo-oc-agg2/ledger-2/agg2",
      harnessFingerprint: "851f1352f3589138",
      whyChosen: "The signed total matches the source ledger.",
      componentEdited: "scripts/summarize.py",
      candidateRef: "inv1",
      changeSummary: "dropped the positive-only filter from the amount sum",
      observedContrast: "the probe total included the credits the base run omitted",
      verdict: "helped",
      cue: "When a ledger includes credits and debits",
      lesson: "Include both signs when summing in scripts/summarize.py.",
      evidence:
        "The scripts/summarize.py row -- removing the positive-only filter changed the probe total to include the credits omitted by the base trajectory.",
      confidence: "high for this observed arithmetic contrast",
      componentsSummary: "1 scripts; 62 always-on chars",
      libraryEntriesBefore: 1,
    },
    {
      taskId: "ledger-1",
      mode: "seq",
      adoptedLabel: "c1",
      adoptedRunId: "demo-oc-seq2/ledger-1/c1",
      harnessFingerprint: "851f1352f3589138",
      whyChosen: "The signed total matches the source ledger.",
      componentEdited: "scripts/summarize.py",
      candidateRef: "inv1",
      changeSummary: "dropped the positive-only filter from the amount sum",
      observedContrast: "the probe total included the credits the base run omitted",
      verdict: "helped",
      cue: "When a ledger includes credits and debits",
      lesson: "Include both signs when summing in scripts/summarize.py.",
      evidence:
        "The scripts/summarize.py row -- removing the positive-only filter changed the probe total to include the credits omitted by the base trajectory.",
      confidence: "high for this observed arithmetic contrast",
      componentsSummary: "1 scripts; 62 always-on chars",
      libraryEntriesBefore: 0,
    },
    {
      taskId: "ledger-2",
      mode: "seq",
      adoptedLabel: "c2",
      adoptedRunId: "demo-oc-seq2/ledger-2/c2",
      harnessFingerprint: "851f1352f3589138",
      whyChosen: "The signed total matches the source ledger.",
      componentEdited: "scripts/summarize.py",
      candidateRef: "inv1",
      changeSummary: "dropped the positive-only filter from the amount sum",
      observedContrast: "the probe total included the credits the base run omitted",
      verdict: "helped",
      cue: "When a ledger includes credits and debits",
      lesson: "Include both signs when summing in scripts/summarize.py.",
      evidence:
        "The scripts/summarize.py row -- removing the positive-only filter changed the probe total to include the credits omitted by the base trajectory.",
      confidence: "high for this observed arithmetic contrast",
      componentsSummary: "1 scripts; 62 always-on chars",
      libraryEntriesBefore: 1,
    },
  ],
};

export const RONDONTECH_ADAPTER_TELEMETRY: DemoRunTelemetry = {
  repository: "https://github.com/google-research/harness2 (rondontech_adapter)",
  packageName: "harness2",
  packageVersion: "0.1.0",
  license: "Apache-2.0",
  paperRef: "arXiv:2610.14224",
  pythonRuntime: "CPython 3.12.16",
  packageManager: "uv 0.13.8",
  command: ".venv/bin/python -m rondontech_adapter.run_demo --output runs/rondontech --k 2",
  exitCode: 0,
  domain: "telecom-infra",
  kBudget: 2,
  rolloutsPerModeTask: 8,
  stagesPerModeTask: 6,
  tasksCompleted: 2,
  tasksFailed: 0,
  totalExecutions: 28,
  totalEditorCalls: 32,
  totalUsdCost: 0.0,
  alwaysOnMaxChars: 24000,
  adoptedAlwaysOnChars: 579,
  editedComponentPath: "scripts/audit_sla.py",
  baseScriptBytes: 699,
  adoptedScriptBytes: 683,
  baseScriptContent: `import csv
import sys

rf_degraded = 0
dc_faults = 0
sla_breaches = 0

with open(sys.argv[1]) as source:
    for row in csv.DictReader(source):
        rsrp = float(row["rsrp_dbm"])
        sinr = float(row["sinr_db"])
        vdc = float(row["rectifier_vdc"])
        uptime = float(row["uptime_pct"])
        if sinr >= 0 and (rsrp < -105.0 or sinr < 3.0):
            rf_degraded += 1
        if 0 < vdc < 46.0 or vdc > 54.5:
            dc_faults += 1
        if uptime < 99.9:
            sla_breaches += 1

status = "CRITICAL" if (rf_degraded + dc_faults + sla_breaches) > 0 else "OK"
print(f"RF_DEGRADED:{rf_degraded} | DC_FAULTS:{dc_faults} | SLA_BREACHES:{sla_breaches} | STATUS:{status}")`,
  adoptedScriptContent: `import csv
import sys

rf_degraded = 0
dc_faults = 0
sla_breaches = 0

with open(sys.argv[1]) as source:
    for row in csv.DictReader(source):
        rsrp = float(row["rsrp_dbm"])
        sinr = float(row["sinr_db"])
        vdc = float(row["rectifier_vdc"])
        uptime = float(row["uptime_pct"])
        if rsrp < -105.0 or sinr < 3.0:
            rf_degraded += 1
        if vdc > -46.0 or vdc < -54.5:
            dc_faults += 1
        if uptime < 99.982:
            sla_breaches += 1

status = "CRITICAL" if (rf_degraded + dc_faults + sla_breaches) > 0 else "OK"
print(f"RF_DEGRADED:{rf_degraded} | DC_FAULTS:{dc_faults} | SLA_BREACHES:{sla_breaches} | STATUS:{status}")`,
  unifiedDiff: `--- base/scripts/audit_sla.py
+++ agg2/scripts/audit_sla.py
@@ -11,11 +11,11 @@
         sinr = float(row["sinr_db"])
         vdc = float(row["rectifier_vdc"])
         uptime = float(row["uptime_pct"])
-        if sinr >= 0 and (rsrp < -105.0 or sinr < 3.0):
+        if rsrp < -105.0 or sinr < 3.0:
             rf_degraded += 1
-        if 0 < vdc < 46.0 or vdc > 54.5:
+        if vdc > -46.0 or vdc < -54.5:
             dc_faults += 1
-        if uptime < 99.9:
+        if uptime < 99.982:
             sla_breaches += 1
 
 status = "CRITICAL" if (rf_degraded + dc_faults + sla_breaches) > 0 else "OK"`,
  taskComparisons: [
    {
      taskId: "telecom-5g-rf-audit",
      domain: "telecom-infra",
      sourceFile: "sources/telecom-5g-rf-audit/telemetry.csv",
      amounts: [
        "STGO-5G-01 (-88.5 dBm / 18.2 dB / -48.2V / 99.985%)",
        "STGO-5G-02 (-108.4 dBm / 4.1 dB / -47.9V / 99.950%)",
        "STGO-5G-03 (-79.0 dBm / 22.5 dB / -48.4V / 99.992%)",
        "STGO-5G-04 (-112.0 dBm / -1.5 dB / -48.1V / 99.920%)",
      ],
      baseOutput: "RF_DEGRADED:1 | DC_FAULTS:0 | SLA_BREACHES:0 | STATUS:CRITICAL",
      adoptedOutput: "RF_DEGRADED:2 | DC_FAULTS:0 | SLA_BREACHES:2 | STATUS:CRITICAL",
      adoptedAggLabel: "agg2",
      adoptedSeqLabel: "c1",
      harnessFingerprint: "00399e4762c059f6",
    },
    {
      taskId: "datacenter-dc-power-sla",
      domain: "telecom-infra",
      sourceFile: "sources/datacenter-dc-power-sla/telemetry.csv",
      amounts: [
        "SCL-DC-01 (-48.0V / 99.995%)",
        "SCL-DC-02 (-43.8V / 99.970%)",
        "SCL-DC-03 (-55.2V / 99.990%)",
        "SCL-DC-04 (-48.3V / 99.988%)",
      ],
      baseOutput: "RF_DEGRADED:0 | DC_FAULTS:0 | SLA_BREACHES:0 | STATUS:OK",
      adoptedOutput: "RF_DEGRADED:0 | DC_FAULTS:2 | SLA_BREACHES:1 | STATUS:CRITICAL",
      adoptedAggLabel: "agg1",
      adoptedSeqLabel: "c2",
      harnessFingerprint: "00399e4762c059f6",
    },
  ],
  components: [
    {
      id: "c1",
      name: "System Prompt",
      opencodePath: "systemprompt.md",
      codexPath: "AGENTS.md",
      contextScope: "ALWAYS_ON",
      runtimeRole: "Context Construction",
      demoStatus: "active",
      demoBytes: 55,
      description:
        "Core audit instruction pointing the executor to scripts/audit_sla.py (55B always-on).",
    },
    {
      id: "c2",
      name: "Guardrails",
      opencodePath: "guardrails.md",
      codexPath: "AGENTS.md",
      contextScope: "ALWAYS_ON",
      runtimeRole: "Context Construction",
      demoStatus: "modified",
      demoBytes: 188,
      description:
        "Populated by DOM probe: enforces sign preservation on dBm/dB RF telemetry and -48V DC bus checks plus Tier III < 99.982% threshold.",
    },
    {
      id: "c3",
      name: "Memory",
      opencodePath: "LongTermMEMORY.md",
      codexPath: "AGENTS.md",
      contextScope: "ALWAYS_ON",
      runtimeRole: "Context Construction",
      demoStatus: "modified",
      demoBytes: 330,
      description:
        "Persisted domain invariants: 5G NR RSRP/SINR thresholds, [-54.5V, -46.0V] -48V DC rectifier window, and Tier III 99.982% SLA.",
    },
    {
      id: "c4",
      name: "Tool Guidance",
      opencodePath: "tool_descriptions/tool_guidance.md",
      codexPath: "AGENTS.md",
      contextScope: "ALWAYS_ON",
      runtimeRole: "Tool Interface",
      demoStatus: "empty_always_on",
      demoBytes: 0,
      description: "Unmodified always-on tool guidance slot (0B in runs/rondontech).",
    },
    {
      id: "c5",
      name: "Subagents",
      opencodePath: "sub_agents/<name>/AGENT.md",
      codexPath: "sub_agents/<name>/AGENT.md",
      contextScope: "ON_DEMAND",
      runtimeRole: "Delegation",
      demoStatus: "stub",
      demoBytes: null,
      description:
        "Delegated subagents invoked on demand via the task tool in their own isolated context.",
    },
    {
      id: "c6",
      name: "Skills",
      opencodePath: "skills/<name>/SKILL.md",
      codexPath: ".agents/skills/<name>/SKILL.md",
      contextScope: "ON_DEMAND",
      runtimeRole: "Context Construction",
      demoStatus: "stub",
      demoBytes: null,
      description:
        "Reusable workflows loaded on demand via the skill tool to keep always-on context lean.",
    },
    {
      id: "c7",
      name: "Scripts",
      opencodePath: "scripts/<name>.py",
      codexPath: "scripts/<name>.py",
      contextScope: "ON_DEMAND",
      runtimeRole: "Tool Interface",
      demoStatus: "modified",
      demoBytes: 683,
      description:
        "Repaired scripts/audit_sla.py (699B -> 683B): removed sinr >= 0 guard, fixed -48V DC polarity bounds, and enforced Tier III 99.982% SLA.",
    },
    {
      id: "c8",
      name: "Plugins",
      opencodePath: "plugin/<name>.ts",
      codexPath: ".codex/hooks.json",
      contextScope: "TOOL_LOOP",
      runtimeRole: "Middleware",
      demoStatus: "stub",
      demoBytes: null,
      description:
        "Always-registered middleware acting inside the tool loop (tool.execute.after, custom tools, system transform).",
    },
  ],
  recursionTrace: [
    {
      mode: "agg",
      phase: "BASE",
      label: "base1",
      dim: "BASE",
      attempts: 1,
      usd: 0.0,
      keptBase: true,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:1 | DC_FAULTS:0 | SLA_BREACHES:0 | STATUS:CRITICAL",
      notes:
        "Unmodified base rollout on telecom-5g-rf-audit (omitted STGO-5G-04 negative SINR -1.5 dB and 2 Tier III SLA breaches).",
    },
    {
      mode: "agg",
      phase: "PROPOSE_PROBE",
      label: "inv1",
      dim: "INV",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:2 | DC_FAULTS:0 | SLA_BREACHES:2 | STATUS:CRITICAL",
      notes:
        "Repaired signed comparisons in scripts/audit_sla.py: removed sinr >= 0 guard, applied [-54.5V, -46.0V] DC bus bounds, and enforced 99.982% Tier III SLA.",
    },
    {
      mode: "agg",
      phase: "PROPOSE_PROBE",
      label: "dom1",
      dim: "DOM",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:1 | DC_FAULTS:0 | SLA_BREACHES:0 | STATUS:CRITICAL",
      notes:
        "Codified telecom-infra invariants in LongTermMEMORY.md (c3) and sign-preservation guardrails in guardrails.md (c2).",
    },
    {
      mode: "agg",
      phase: "PROPOSE_PROBE",
      label: "inv2",
      dim: "INV",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:2 | DC_FAULTS:0 | SLA_BREACHES:2 | STATUS:CRITICAL",
      notes:
        "Repaired signed comparisons in scripts/audit_sla.py: removed sinr >= 0 guard, applied [-54.5V, -46.0V] DC bus bounds, and enforced 99.982% Tier III SLA.",
    },
    {
      mode: "agg",
      phase: "PROPOSE_PROBE",
      label: "dom2",
      dim: "DOM",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:1 | DC_FAULTS:0 | SLA_BREACHES:0 | STATUS:CRITICAL",
      notes:
        "Codified telecom-infra invariants in LongTermMEMORY.md (c3) and sign-preservation guardrails in guardrails.md (c2).",
    },
    {
      mode: "agg",
      phase: "COMPOSE",
      label: "agg1",
      dim: "AGG",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:2 | DC_FAULTS:0 | SLA_BREACHES:2 | STATUS:CRITICAL",
      notes:
        "Composed c7 scripts/audit_sla.py signed-threshold fix with c3 LongTermMEMORY.md and c2 guardrails.md (selected as A -> agg1 on datacenter-dc-power-sla).",
    },
    {
      mode: "agg",
      phase: "COMPOSE",
      label: "agg2",
      dim: "AGG",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:2 | DC_FAULTS:0 | SLA_BREACHES:2 | STATUS:CRITICAL",
      notes:
        "Selected parallel composition (A -> agg2) for telecom-5g-rf-audit; Jaccard similarity 1.0.",
    },
    {
      mode: "seq",
      phase: "PROPOSE_PROBE",
      label: "inv1",
      dim: "INV",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:2 | DC_FAULTS:0 | SLA_BREACHES:2 | STATUS:CRITICAL",
      notes:
        "Sequential step 1 invariant edit: repaired signed comparisons in scripts/audit_sla.py.",
    },
    {
      mode: "seq",
      phase: "PROPOSE_PROBE",
      label: "dom1",
      dim: "DOM",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:1 | DC_FAULTS:0 | SLA_BREACHES:0 | STATUS:CRITICAL",
      notes:
        "Sequential step 1 domain edit: codified LongTermMEMORY.md (c3) and guardrails.md (c2).",
    },
    {
      mode: "seq",
      phase: "COMPOSE",
      label: "c1",
      dim: "COMPOSE",
      attempts: 1,
      usd: 0.0,
      keptBase: false,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:2 | DC_FAULTS:0 | SLA_BREACHES:2 | STATUS:CRITICAL",
      notes:
        "Sequential step 1 composition merging c7 fix + c3 memory + c2 guardrails (selected as A -> c1 on telecom-5g-rf-audit).",
    },
    {
      mode: "seq",
      phase: "PROPOSE_PROBE",
      label: "inv2",
      dim: "INV",
      attempts: 1,
      usd: 0.0,
      keptBase: true,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:2 | DC_FAULTS:0 | SLA_BREACHES:2 | STATUS:CRITICAL",
      notes:
        "Sequential step 2 invariant probe; no further delta over c1 (keptBase=true).",
    },
    {
      mode: "seq",
      phase: "PROPOSE_PROBE",
      label: "dom2",
      dim: "DOM",
      attempts: 1,
      usd: 0.0,
      keptBase: true,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:2 | DC_FAULTS:0 | SLA_BREACHES:2 | STATUS:CRITICAL",
      notes:
        "Sequential step 2 domain probe; no further delta over c1 (keptBase=true).",
    },
    {
      mode: "seq",
      phase: "COMPOSE",
      label: "c2",
      dim: "COMPOSE",
      attempts: 1,
      usd: 0.0,
      keptBase: true,
      fellBack: false,
      executionFailed: false,
      outputPreview: "RF_DEGRADED:2 | DC_FAULTS:0 | SLA_BREACHES:2 | STATUS:CRITICAL",
      notes:
        "Sequential step 2 composition (selected as A -> c2 on datacenter-dc-power-sla).",
    },
  ],
  experienceLessons: [
    {
      taskId: "telecom-5g-rf-audit",
      mode: "agg",
      adoptedLabel: "agg2",
      adoptedRunId: "rondontech-oc-agg2/telecom-5g-rf-audit/agg2",
      harnessFingerprint: "00399e4762c059f6",
      whyChosen: "Signed RF/DC thresholds and Tier III 99.982% SLA match source telemetry.",
      componentEdited: "scripts/audit_sla.py",
      candidateRef: "inv1 + dom1",
      changeSummary:
        "removed sinr >= 0 guard, fixed -48V DC negative polarity window [-54.5, -46.0], enforced Tier III 99.982% SLA, and persisted invariants in LongTermMEMORY.md",
      observedContrast:
        "caught negative SINR (-1.5 dB), -43.8V/-55.2V rectifier faults, and 99.92%-99.97% SLA breaches missed by base",
      verdict: "helped",
      cue: "When auditing 5G RAN RF KPIs (dBm/dB), -48V DC rectifier buses, or Tier III SLA uptime",
      lesson:
        "Preserve negative signs on dB/dBm and -48V DC thresholds and enforce 99.982% Tier III availability in scripts/audit_sla.py.",
      evidence:
        "Base script omitted negative SINR (-1.5 dB), missed -43.8V/-55.2V DC bus faults due to positive voltage checks, and used 99.9% instead of 99.982%.",
      confidence: "high for observed telecom-infra telemetry contrast",
      componentsSummary: "1 scripts; 579 always-on chars",
      libraryEntriesBefore: 0,
    },
    {
      taskId: "datacenter-dc-power-sla",
      mode: "agg",
      adoptedLabel: "agg1",
      adoptedRunId: "rondontech-oc-agg2/datacenter-dc-power-sla/agg1",
      harnessFingerprint: "00399e4762c059f6",
      whyChosen: "Signed RF/DC thresholds and Tier III 99.982% SLA match source telemetry.",
      componentEdited: "scripts/audit_sla.py",
      candidateRef: "inv1 + dom1",
      changeSummary:
        "removed sinr >= 0 guard, fixed -48V DC negative polarity window [-54.5, -46.0], enforced Tier III 99.982% SLA, and persisted invariants in LongTermMEMORY.md",
      observedContrast:
        "caught negative SINR (-1.5 dB), -43.8V/-55.2V rectifier faults, and 99.92%-99.97% SLA breaches missed by base",
      verdict: "helped",
      cue: "When auditing 5G RAN RF KPIs (dBm/dB), -48V DC rectifier buses, or Tier III SLA uptime",
      lesson:
        "Preserve negative signs on dB/dBm and -48V DC thresholds and enforce 99.982% Tier III availability in scripts/audit_sla.py.",
      evidence:
        "Base script omitted negative SINR (-1.5 dB), missed -43.8V/-55.2V DC bus faults due to positive voltage checks, and used 99.9% instead of 99.982%.",
      confidence: "high for observed telecom-infra telemetry contrast",
      componentsSummary: "1 scripts; 579 always-on chars",
      libraryEntriesBefore: 1,
    },
    {
      taskId: "telecom-5g-rf-audit",
      mode: "seq",
      adoptedLabel: "c1",
      adoptedRunId: "rondontech-oc-seq2/telecom-5g-rf-audit/c1",
      harnessFingerprint: "00399e4762c059f6",
      whyChosen: "Signed RF/DC thresholds and Tier III 99.982% SLA match source telemetry.",
      componentEdited: "scripts/audit_sla.py",
      candidateRef: "inv1 + dom1",
      changeSummary:
        "removed sinr >= 0 guard, fixed -48V DC negative polarity window [-54.5, -46.0], enforced Tier III 99.982% SLA, and persisted invariants in LongTermMEMORY.md",
      observedContrast:
        "caught negative SINR (-1.5 dB), -43.8V/-55.2V rectifier faults, and 99.92%-99.97% SLA breaches missed by base",
      verdict: "helped",
      cue: "When auditing 5G RAN RF KPIs (dBm/dB), -48V DC rectifier buses, or Tier III SLA uptime",
      lesson:
        "Preserve negative signs on dB/dBm and -48V DC thresholds and enforce 99.982% Tier III availability in scripts/audit_sla.py.",
      evidence:
        "Base script omitted negative SINR (-1.5 dB), missed -43.8V/-55.2V DC bus faults due to positive voltage checks, and used 99.9% instead of 99.982%.",
      confidence: "high for observed telecom-infra telemetry contrast",
      componentsSummary: "1 scripts; 579 always-on chars",
      libraryEntriesBefore: 0,
    },
    {
      taskId: "datacenter-dc-power-sla",
      mode: "seq",
      adoptedLabel: "c2",
      adoptedRunId: "rondontech-oc-seq2/datacenter-dc-power-sla/c2",
      harnessFingerprint: "00399e4762c059f6",
      whyChosen: "Signed RF/DC thresholds and Tier III 99.982% SLA match source telemetry.",
      componentEdited: "scripts/audit_sla.py",
      candidateRef: "inv1 + dom1",
      changeSummary:
        "removed sinr >= 0 guard, fixed -48V DC negative polarity window [-54.5, -46.0], enforced Tier III 99.982% SLA, and persisted invariants in LongTermMEMORY.md",
      observedContrast:
        "caught negative SINR (-1.5 dB), -43.8V/-55.2V rectifier faults, and 99.92%-99.97% SLA breaches missed by base",
      verdict: "helped",
      cue: "When auditing 5G RAN RF KPIs (dBm/dB), -48V DC rectifier buses, or Tier III SLA uptime",
      lesson:
        "Preserve negative signs on dB/dBm and -48V DC thresholds and enforce 99.982% Tier III availability in scripts/audit_sla.py.",
      evidence:
        "Base script omitted negative SINR (-1.5 dB), missed -43.8V/-55.2V DC bus faults due to positive voltage checks, and used 99.9% instead of 99.982%.",
      confidence: "high for observed telecom-infra telemetry contrast",
      componentsSummary: "1 scripts; 579 always-on chars",
      libraryEntriesBefore: 1,
    },
  ],
};
