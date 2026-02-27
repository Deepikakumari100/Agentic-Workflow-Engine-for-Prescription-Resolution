"""Interaction agent: checks for drug-drug interactions."""

from typing import Dict, List
import json

# load a mock knowledge base and normalize keys to tuples
with open("data/drug_interactions.json", "r") as f:
    raw = json.load(f)
# expect raw to be a list of objects with pair and severity
# convert to dict for fast lookup
INTERACTIONS = {}
for entry in raw:
    pair = tuple(sorted(entry.get("pair", [])))
    INTERACTIONS[pair] = entry.get("severity")


def check(parsed: Dict) -> Dict:
    meds = [m["name"] for m in parsed.get("medications", [])]
    found = []
    for i in range(len(meds)):
        for j in range(i + 1, len(meds)):
            pair = tuple(sorted([meds[i], meds[j]]))
            if pair in INTERACTIONS:
                found.append({"pair": pair, "severity": INTERACTIONS[pair]})
    return {"interactions": found}
