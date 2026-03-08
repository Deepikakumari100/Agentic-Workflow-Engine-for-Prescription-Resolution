// API Service Layer for FastAPI backend

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ----------------------------------------------

class ApiService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async handleResponse(response) {
    let data;
    try {
      data = await response.json();
    } catch (e) {
      throw { message: "Invalid JSON response", status: response.status };
    }

    if (!response.ok) {
      throw {
        message: data?.detail || "API Error",
        status: response.status,
      };
    }
    return data;
  }

  getAuthHeaders() {
    const token = localStorage.getItem("token");
    return token
      ? { Authorization: `Bearer ${token}` }
      : {};
  }

  // ------------------ AUTH ---------------------

  async login(email, password) {
    const response = await fetch(`${this.baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    return this.handleResponse(response);
  }

  async signup(email, password, name, role) {
    const response = await fetch(`${this.baseUrl}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, role }),
    });

    return this.handleResponse(response);
  }

  // ------------- PRESCRIPTION UPLOAD ------------------

  async uploadPrescription(formData) {
    const response = await fetch(`${this.baseUrl}/prescriptions/upload`, {
      method: "POST",
      headers: {
        ...this.getAuthHeaders(),
        // ⚠️ DON'T send Content-Type -> Browser sets it automatically for FormData
      },
      body: formData,
    });

    return this.handleResponse(response);
  }

  // ------------- GET ANALYSIS ------------------

  async getAnalysis(id) {
    const response = await fetch(`${this.baseUrl}/analysis/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
    });

    return this.handleResponse(response);
  }

  // ------------- PATIENTS ------------------

  async getPatientRecords() {
    const response = await fetch(`${this.baseUrl}/patients`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeaders(),
      },
    });

    return this.handleResponse(response);
  }

  async searchPatients(query) {
    const response = await fetch(
      `${this.baseUrl}/patients/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          ...this.getAuthHeaders(),
        },
      }
    );

    return this.handleResponse(response);
  }

  // ------------- CONTACT FORM ------------------

  async submitContactForm(data) {
    const response = await fetch(`${this.baseUrl}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    return this.handleResponse(response);
  }

  // ----- Prescription history for each patient ------

  async getPatientPrescriptions(patientId) {
    const response = await fetch(
      `${this.baseUrl}/patients/${patientId}/prescriptions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return this.handleResponse(response);
  }
}

// ----------------------------------------------------

export const apiService = new ApiService(API_BASE_URL);
