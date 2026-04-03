import { MercadoPagoConfig, User } from 'mercadopago';

async function checkAccountInfo() {
  const token = "APP_USR-2719253019636480-012822-2043cd2871097c1f14e65837cd1a6e35-3166969772";
  
  try {
    const client = new MercadoPagoConfig({ accessToken: token });
    const user = new User(client);
    
    // In SDK v2, getting "me" requires a simple call to the user entity
    const me = await user.me();
    
    console.log('--- MERCADO PAGO ACCOUNT INFO ---');
    console.log('Email:', me.email);
    console.log('Account Type:', me.user_type);
    console.log('Nickname:', me.nickname);
    console.log('---------------------------------');
    
  } catch (error) {
    console.error('Error fetching account info:', error);
  }
}

checkAccountInfo();
