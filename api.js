const KIJ_API_BASE = 'https://mrdindoin.ddns.net/kij';

class KijApi {
  constructor(baseUrl = KIJ_API_BASE) { this.baseUrl = baseUrl.replace(/\/$/, ''); }
  get token() { return sessionStorage.getItem('kij_admin_token') || ''; }
  set token(value) { value ? sessionStorage.setItem('kij_admin_token', value) : sessionStorage.removeItem('kij_admin_token'); }
  async request(path, options = {}) {
    const headers = new Headers(options.headers || {});
    if (this.token) headers.set('Authorization', `Bearer ${this.token}`);
    if (options.body && !(options.body instanceof FormData)) headers.set('Content-Type', 'application/json');
    const response = await fetch(`${this.baseUrl}${path}`, { ...options, headers });
    if (response.status === 401) this.token = '';
    if (!response.ok) {
      const message = await response.json().then(data => data.message || data.error).catch(() => '');
      throw new Error(message || `요청 실패 (${response.status})`);
    }
    return response.status === 204 ? null : response.json();
  }
  login(username, password) { return this.request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }); }
  notices() { return this.request('/notices'); }
  createNotice(data) { return this.request('/notices', { method: 'POST', body: JSON.stringify(data) }); }
  updateNotice(id, data) { return this.request(`/notices/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(data) }); }
  deleteNotice(id) { return this.request(`/notices/${encodeURIComponent(id)}`, { method: 'DELETE' }); }
  organization() { return this.request('/organization'); }
  updateOrganization(data) { return this.request('/organization', { method: 'PUT', body: data }); }
  performances(category = '') { return this.request(`/performances${category ? `?category=${encodeURIComponent(category)}` : ''}`); }
  createPerformance(data) { return this.request('/performances', { method: 'POST', body: data }); }
  updatePerformance(id, data) { return this.request(`/performances/${encodeURIComponent(id)}`, { method: 'PUT', body: data }); }
  deletePerformance(id) { return this.request(`/performances/${encodeURIComponent(id)}`, { method: 'DELETE' }); }
}
window.kijApi = new KijApi();
