export function getAccountabilityPartnerEmail(
  partnerName: string,
  userName: string,
  userEmail: string
) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WeekWrap Accountability Partner Invitation</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9fafb;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .card {
      background-color: white;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
      padding: 30px;
      margin-bottom: 20px;
    }
    .header {
      text-align: center;
      margin-bottom: 30px;
    }
    .logo {
      font-size: 24px;
      font-weight: bold;
      color: #6366f1;
      margin-bottom: 10px;
    }
    h1 {
      color: #111827;
      font-size: 22px;
      margin: 0 0 20px;
    }
    p {
      margin: 0 0 20px;
      color: #4b5563;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #6b7280;
      margin-top: 30px;
    }
    .highlight {
      font-weight: 600;
      color: #6366f1;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="card">
      <div class="header">
        <div class="logo">WeekWrap</div>
      </div>
      
      <h1>You've Been Invited as an Accountability Partner</h1>
      
      <p>Hello ${partnerName},</p>
      
      <p><span class="highlight">${userName}</span> has added you as their accountability partner on WeekWrap, a platform designed to help people track and share their progress.</p>
      
      <p>As an accountability partner, you'll receive weekly summaries of ${userName}'s logs and accomplishments. Your role is to provide encouragement, feedback, and help them stay on track with their goals.</p>
      
      <p>You don't need to create an account or do anything right now. You'll start receiving email updates automatically when ${userName} logs their activities.</p>
      
      <p>If you have any questions, you can reply directly to this email or contact ${userName} at <a href="mailto:${userEmail}">${userEmail}</a>.</p>
      
      <p>Thank you for being a supportive accountability partner!</p>
    </div>
    
    <div class="footer">
      <p>&copy; 2024 WeekWrap. All rights reserved.</p>
      <p>Helping people track progress and achieve goals through accountability.</p>
    </div>
  </div>
</body>
</html>
  `;
}
