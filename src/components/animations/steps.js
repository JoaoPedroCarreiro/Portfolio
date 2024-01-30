const steps = [
    [800, `
        0@idle@
    `],
    [400, `
        0!@setCursor@
    `],
    [100, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Document@setCursor@</title>
        1</head>
        1<body>
        2
        1</body>
        0</html>
    `],
    [200, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Document@idle@</title>
        1</head>
        1<body>
        2
        1</body>
        0</html>
    `],
    [100 * 8, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Document@erase8@</title>
        1</head>
        1<body>
        2
        1</body>
        0</html>
    `],
    [80 * 22, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>@write:Portfólio | João Pedro@</title>
        1</head>
        1<body>
        2
        1</body>
        0</html>
    `],
    [100, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro@idle@</title>
        1</head>
        1<body>
        2
        1</body>
        0</html>
    `],
    [150, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>@setCursor@
        1<body>
        2
        1</body>
        0</html>
    `],
    [150, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>
        1<body>@setCursor@
        2
        1</body>
        0</html>
    `],
    [150, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>
        1<body>
        2@setCursor@
        1</body>
        0</html>
    `],
    [80 * 2, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>
        1<body>
        2@write:h1@
        1</body>
        0</html>
    `],
    [100, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>
        1<body>
        2<h1>@setCursor@</h1>
        1</body>
        0</html>
    `],
    [80 * 29, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>
        1<body>
        2<h1>@write:Bem-vindo ao meu portfólio :)@</h1>
        1</body>
        0</html>
    `],
    [150 * 5, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>
        1<body>
        2<h1>Bem-vindo ao meu portfólio :)@moveCursor5@</h1>
        1</body>
        0</html>
    `],
    [200, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>
        1<body>
        2<h1>Bem-vindo ao meu portfólio :)</h1>
        2@setCursor@
        1</body>
        0</html>
    `],
    [200, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>
        1<body>
        2<h1>Bem-vindo ao meu portfólio :)</h1>
        2p@setCursor@
        1</body>
        0</html>
    `],
    [200, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>
        1<body>
        2<h1>Bem-vindo ao meu portfólio :)</h1>
        2<p>@setCursor@</p>
        1</body>
        0</html>
    `],
    [80 * 35, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>
        1<body>
        2<h1>Bem-vindo ao meu portfólio :)</h1>
        2<p>@write:Fique à vontade para conhecer tudo!@</p>
        1</body>
        0</html>
    `],
    [10000, `
        0<!DOCTYPE html>
        0<html lang="en">
        1<head>
        2<title>Portfólio | João Pedro</title>
        1</head>
        1<body>
        2<h1>Bem-vindo ao meu portfólio :)</h1>
        2<p>Fique à vontade para conhecer tudo!@idle@</p>
        1</body>
        0</html>
    `],
    [10, `
        0@setCursor@
    `],
]

export default steps