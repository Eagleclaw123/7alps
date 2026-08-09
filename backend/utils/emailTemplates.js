// Shared 7ALP's brand HTML email layout — keeps every outgoing email
// (OTPs, password resets, notifications) visually consistent.
// Colors/logo mirror the frontend's brand usage (see index.html theme-color
// and the auth pages' CTA color).
const LOGO_URL =
  'https://res.cloudinary.com/dasvdkncm/image/upload/v1781664574/7_ALP_s_Logo-removebg-preview_e7kr1k.png';

const BRAND = {
  primary: '#0F6B3E',
  dark: '#16442C',
  cream: '#FAF6EF',
  text: '#202020',
  muted: '#86806F',
  border: '#E3DFD2',
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[char]));

const layout = ({ preheader = '', heading, bodyHtml }) => `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>7ALP's</title>
  </head>
  <body style="margin:0;padding:0;background-color:${BRAND.cream};font-family:Arial, Helvetica, sans-serif;">
    <span style="display:none;font-size:1px;color:${BRAND.cream};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${escapeHtml(preheader)}</span>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.cream};padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" cellpadding="0" cellspacing="0" style="max-width:480px;width:100%;background-color:#ffffff;border-radius:12px;overflow:hidden;border:1px solid ${BRAND.border};">
            <tr>
              <td style="background-color:${BRAND.dark};padding:24px 32px;text-align:center;">
                <img src="${LOGO_URL}" alt="7ALP's" height="40" style="height:40px;width:auto;" />
              </td>
            </tr>
            <tr>
              <td style="padding:32px;">
                <h1 style="margin:0 0 16px;font-size:20px;line-height:1.4;color:${BRAND.text};">${escapeHtml(heading)}</h1>
                ${bodyHtml}
              </td>
            </tr>
            <tr>
              <td style="padding:20px 32px;background-color:${BRAND.cream};text-align:center;border-top:1px solid ${BRAND.border};">
                <p style="margin:0;font-size:12px;color:${BRAND.muted};">&copy; ${new Date().getFullYear()} 7ALP's. All rights reserved.</p>
                <p style="margin:4px 0 0;font-size:12px;color:${BRAND.muted};">If you didn't request this email, you can safely ignore it.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const otpBlock = (otp) => `<div style="margin:24px 0;text-align:center;">
  <span style="display:inline-block;padding:14px 28px;background-color:${BRAND.cream};border:1px dashed ${BRAND.primary};border-radius:8px;font-size:28px;font-weight:700;letter-spacing:8px;color:${BRAND.dark};">${escapeHtml(otp)}</span>
</div>`;

// heading, intro, otp, minutes -> { html, text }
exports.otpEmail = ({ heading, intro, otp, minutes }) => {
  const bodyHtml = `
    <p style="margin:0 0 8px;font-size:14px;color:${BRAND.text};line-height:1.6;">${escapeHtml(intro)}</p>
    ${otpBlock(otp)}
    <p style="margin:0;font-size:13px;color:${BRAND.muted};text-align:center;">This code expires in ${minutes} minute${minutes === 1 ? '' : 's'}.</p>
  `;

  return {
    html: layout({ preheader: `Your 7ALP's verification code is ${otp}`, heading, bodyHtml }),
    text: `${intro}\n\nYour code: ${otp}\n\nThis code expires in ${minutes} minute${minutes === 1 ? '' : 's'}.`,
  };
};

// heading, lines: [[label, value], ...] -> { html, text }
exports.notificationEmail = ({ heading, lines }) => {
  const rows = lines.filter(([, value]) => value !== null && value !== undefined && value !== '');

  const bodyHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      ${rows
        .map(
          ([label, value]) => `<tr>
            <td style="padding:6px 12px 6px 0;font-size:13px;color:${BRAND.muted};width:140px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
            <td style="padding:6px 0;font-size:14px;color:${BRAND.text};">${escapeHtml(value)}</td>
          </tr>`,
        )
        .join('')}
    </table>
  `;

  return {
    html: layout({ heading, bodyHtml }),
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n'),
  };
};
