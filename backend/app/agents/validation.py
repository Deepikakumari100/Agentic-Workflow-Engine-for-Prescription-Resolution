"""Validation agent: checks dosage ranges and availability."""

from typing import Dict, List

# sample drug database
DRUG_DB = {"DrugA": {"max_dose": "20mg", "available": True}}


def validate(parsed: Dict) -> Dict:
    meds = parsed.get("medications", [])
    results = []
    for med in meds:
        info = DRUG_DB.get(med["name"], {})
        results.append(
            {
                "name": med["name"],
                "ok": med["dose"] <= info.get("max_dose", "0"),
                "available": info.get("available", False),
            }
        )
    return {"medications": results}
