"""Recommendation agent: suggests safer alternatives."""

from typing import Dict, List

# simple mapping for replacements
ALTERNATIVES = {"DrugA": "DrugB"}


def suggest(parsed: Dict, interactions: Dict) -> Dict:
    recs = []
    for med in parsed.get("medications", []):
        alt = ALTERNATIVES.get(med["name"])
        if alt:
            recs.append({"original": med["name"], "suggested": alt})
    return {"recommendations": recs}
