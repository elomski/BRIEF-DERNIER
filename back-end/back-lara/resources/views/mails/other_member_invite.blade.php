<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Confirmation d'email</title>
</head>

<body style="font-family: Arial, sans-serif; line-height: 1.6;">
    <div style="text-align: center; padding: 20px;">
        <h3>Salut, {{ $name }} Vous invite à rejoindre le groupe ( {{ $groupe_name }} ).</h3>
        <a style="font-size: 15px; margin: 20px 0;">{{ $url }}</a>
        <h4>Utilisez ce lien ci-dessus pour vous inscrire et acceder au groupe.</h4>
    </div>
</body>

</html>