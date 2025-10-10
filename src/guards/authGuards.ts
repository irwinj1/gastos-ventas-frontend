import { jwtDecode } from "jwt-decode";
import { validateToken,refreshToken } from "../services";

export const authGuard = async (to, from, next) => {
  const publicRoute: string[] = ['/login', '/register', '/forgot-password'];

  if (publicRoute.includes(to.path)) {
    return next();
  }

  let token: string | null = localStorage.getItem('token');

  if (!token) {
    localStorage.clear();
    return next('/login');
  }

  try {
    const decoded: any = jwtDecode(token);
    const dateExp = new Date(decoded.exp * 1000);
    const now = new Date();

    if (dateExp < now) {
      console.warn('Token expirado');
      const response = await refreshToken()
      if (response.data.status == 200) {
        token = JSON.stringify(response.data?.data?.access_token)
        localStorage.setItem('token',token)
      }else{
        localStorage.clear();
        return next('/login');
      }
      
    }
    const ojb = {
        "token":token
    }
    // // Validar token con backend
    const response = await validateToken(ojb);

    

    if (!response || response.status !== 200) {
      console.warn('Token inválido en backend');
      localStorage.clear();
      return next('/login');
    }

    // Token válido → permitir acceso
    return next();

  } catch (error) {
    console.error('Error decodificando token:', error);
    localStorage.clear();
    return next('/login');
  }
};
