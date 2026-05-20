import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

interface ContactEmailProps {
  to: string;
  name: string;
  service: string;
  message: string;
}

export async function sendContactEmail({
  to,
  name,
  service,
  message,
}: ContactEmailProps) {
  try {
    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@domuswerk.it',
      subject: 'Grazie per averci contattato - DomusWerk',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000;">Grazie ${name}!</h1>
          <p>Abbiamo ricevuto il tuo messaggio riguardante il servizio <strong>${service}</strong>.</p>
          <p>Il nostro team ti contatterà entro 24 ore.</p>
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
          <p style="color: #666; font-size: 12px;">
            Messaggio automatico. Per rispondere, contatta il nostro team.
          </p>
        </div>
      `,
    });
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
}

interface BookingConfirmationProps {
  to: string;
  name: string;
  service: string;
  date: string;
  time: string;
}

export async function sendBookingConfirmation({
  to,
  name,
  service,
  date,
  time,
}: BookingConfirmationProps) {
  try {
    await sgMail.send({
      to,
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@domuswerk.it',
      subject: 'Prenotazione Confermata - DomusWerk',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #000;">Prenotazione Confermata!</h1>
          <p>Ciao ${name},</p>
          <p>La tua prenotazione è stata confermata:</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Servizio:</strong> ${service}</p>
            <p><strong>Data:</strong> ${date}</p>
            <p><strong>Ora:</strong> ${time}</p>
          </div>
          <p>Se hai domande, contattaci a info@domuswerk.it</p>
          <p>A presto!<br>Team DomusWerk</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
}

interface AdminNotificationProps {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function sendAdminNotification({
  name,
  email,
  phone,
  service,
  message,
}: AdminNotificationProps) {
  try {
    await sgMail.send({
      to: process.env.CONTACT_EMAIL || 'info@domuswerk.it',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@domuswerk.it',
      subject: `Nuovo Messaggio Contatto - ${service}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Nuovo Messaggio da ${name}</h2>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telefono:</strong> ${phone}</p>
          <p><strong>Servizio:</strong> ${service}</p>
          <hr />
          <p><strong>Messaggio:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('SendGrid error:', error);
    throw error;
  }
}
