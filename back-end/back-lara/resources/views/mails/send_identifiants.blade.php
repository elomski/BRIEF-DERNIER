<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Informations de connection</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6;">
    <div style="text-align: center; padding: 20px;">
        <h3>Bonjour, {{ $last_name }}</h3>
        <h4>Voici vos informations de connection :</h4>
        <h1 style="font-size: 2em; margin: 20px 0;">Identifiant -> {{ $id }}</h1>
        <h1 style="font-size: 2em; margin: 20px 0;">Mot de passe -> {{ $password }}</h1>
        <p>Vous pouvez les changées dans les paramètres.</p>
    </div>
</body>

</html>