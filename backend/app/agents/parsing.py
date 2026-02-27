"""Parsing agent: OCR and NLP for prescriptions."""

from typing import Dict

# placeholder for OCR using pytesseract/Tesseract

def extract_text_from_image(image_bytes: bytes) -> str:
    # In a real implementation, you would call pytesseract.image_to_string
    # or a deep learning based OCR model.
    # For now return a dummy string or raise NotImplementedError.
    return "Mock prescription text extracted from image."


def parse_prescription_text(text: str) -> Dict:
    # Use NLP (e.g. transformers) to extract medicines, dosages, frequency, etc.
    # For demo purposes, return a simple structure.
    return {
        "patient_id": "patient123",
        "medications": [
            {"name": "DrugA", "dose": "10mg", "frequency": "once daily"},
        ],
    }
