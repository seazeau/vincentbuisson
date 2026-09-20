<?php
// Protection CORS et Content-Type JSON
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Méthode non autorisée']);
    exit;
}

// Récupération des données JSON envoyées
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data || empty($data['name']) || empty($data['email'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Champs obligatoires manquants']);
    exit;
}

$name = htmlspecialchars(trim($data['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($data['phone'] ?? 'Non renseigné'), ENT_QUOTES, 'UTF-8');
$distance = htmlspecialchars(trim($data['distance'] ?? 'Non précisé'), ENT_QUOTES, 'UTF-8');
$plan = htmlspecialchars(trim($data['plan'] ?? 'Non précisé'), ENT_QUOTES, 'UTF-8');
$currentRecord = htmlspecialchars(trim($data['currentRecord'] ?? 'Non renseigné'), ENT_QUOTES, 'UTF-8');
$targetGoal = htmlspecialchars(trim($data['targetGoal'] ?? 'Non renseigné'), ENT_QUOTES, 'UTF-8');
$weeklyRuns = htmlspecialchars(trim($data['weeklyRuns'] ?? 'Non renseigné'), ENT_QUOTES, 'UTF-8');
$message = nl2br(htmlspecialchars(trim($data['message'] ?? 'Aucune remarque'), ENT_QUOTES, 'UTF-8'));

$to = 'contact@runpassion.fr';
$subject = "=?UTF-8?B?" . base64_encode("Candidature Coaching : {$name} ({$distance})") . "?=";

// Message HTML soigné
$htmlBody = "
<!DOCTYPE html>
<html lang='fr'>
<head>
  <meta charset='UTF-8'>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0c0c0b; color: #f2eee4; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #141412; border: 1px solid #2a2a26; border-radius: 16px; overflow: hidden; }
    .header { background-color: #1c1c18; padding: 24px; border-bottom: 2px solid #d4ff00; text-align: center; }
    .header h1 { color: #d4ff00; font-size: 20px; margin: 0; text-transform: uppercase; letter-spacing: 1px; }
    .header p { color: #a0a095; font-size: 12px; margin: 5px 0 0; }
    .content { padding: 24px; }
    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #262622; font-size: 14px; }
    th { color: #888880; width: 35%; text-transform: uppercase; font-size: 11px; }
    td { color: #ffffff; font-weight: 500; }
    .highlight { color: #d4ff00; font-weight: bold; }
    .message-box { background-color: #0c0c0b; border: 1px solid #262622; border-radius: 8px; padding: 14px; margin-top: 16px; font-size: 13px; color: #cfcfc4; }
    .footer { padding: 16px; text-align: center; font-size: 11px; color: #666; border-top: 1px solid #222; }
  </style>
</head>
<body>
  <div class='container'>
    <div class='header'>
      <h1>Nouvelle Candidature Coaching</h1>
      <p>Reçue via vincentbuisson.fr</p>
    </div>
    <div class='content'>
      <table>
        <tr><th>Nom & Prénom</th><td class='highlight'>{$name}</td></tr>
        <tr><th>Email</th><td><a href='mailto:{$email}' style='color: #d4ff00;'>{$email}</a></td></tr>
        <tr><th>Téléphone</th><td>{$phone}</td></tr>
        <tr><th>Distance Cible</th><td class='highlight'>{$distance}</td></tr>
        <tr><th>Formule Choisie</th><td>{$plan}</td></tr>
        <tr><th>Niveau / VMA</th><td>{$currentRecord}</td></tr>
        <tr><th>Objectif Visé</th><td>{$targetGoal}</td></tr>
        <tr><th>Séances / Semaine</th><td>{$weeklyRuns}</td></tr>
      </table>
      <div style='margin-top: 20px;'>
        <strong style='color: #888880; font-size: 11px; text-transform: uppercase;'>Remarques & Contraintes :</strong>
        <div class='message-box'>{$message}</div>
      </div>
    </div>
    <div class='footer'>
      Ce message a été envoyé directement depuis le formulaire de candidature de vincentbuisson.fr
    </div>
  </div>
</body>
</html>
";

$headers = "MIME-Version: 1.0
";
$headers .= "From: Vincent Buisson Coaching <contact@runpassion.fr>
";
$headers .= "Reply-To: {$name} <{$email}>
";
$headers .= "Content-Type: text/html; charset=UTF-8
";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = @mail($to, $subject, $htmlBody, $headers);

if ($sent) {
    echo json_encode(['success' => true, 'message' => 'Candidature envoyée avec succès']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Erreur lors de l\'envoi par mail()']);
}
