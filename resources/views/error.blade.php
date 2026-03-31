<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BukuKu | Error {{ $exception->getStatusCode() }}</title>
    <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
        rel="stylesheet">

    <style>
        :root {
            --primary: #534AB7;
            --primary-light: #7F77DD;
            --bg-base: #FAFAF8;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'DM Sans', sans-serif;
            background-color: var(--bg-base);
            background-image: radial-gradient(circle, #534AB725 1px, transparent 1px);
            background-size: 28px 28px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            /* Mencegah scroll yang tidak perlu saat animasi */
        }

        .overlay {
            position: fixed;
            inset: 0;
            background: radial-gradient(ellipse 80% 70% at 50% 50%,
                    rgba(250, 250, 248, 0.2) 0%,
                    rgba(250, 250, 248, 0.9) 60%,
                    rgba(250, 250, 248, 1) 100%);
            pointer-events: none;
        }

        .container {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 24px;
            padding: 40px 24px;
            max-width: 520px;
            width: 100%;
            animation: fadeInUp 0.6s ease-out forwards;
        }

        /* Logo */
        .logo {
            font-size: 26px;
            font-weight: 900;
            color: var(--primary);
            text-decoration: none;
            letter-spacing: -1px;
            margin-bottom: 12px;
            transition: transform 0.3s ease;
        }

        .logo:hover {
            transform: scale(1.05);
        }

        /* Error code */
        .error-code {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            line-height: 0.8;
            user-select: none;
        }

        .error-digit {
            font-size: clamp(80px, 15vw, 110px);
            /* Ukuran adaptif */
            font-weight: 1000;
            color: #EEEDFE;
            letter-spacing: -6px;
            text-shadow: 2px 2px 0px rgba(83, 74, 183, 0.05);
        }

        .error-icon {
            width: 64px;
            height: 64px;
            border-radius: 18px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
            animation: bounce 2s infinite ease-in-out;
        }

        @keyframes bounce {

            0%,
            100% {
                transform: translateY(0);
            }

            50% {
                transform: translateY(-8px);
            }
        }

        /* Badge Styles Improved */
        .badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            border-radius: 999px;
            padding: 6px 16px;
            font-size: 13px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .badge-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            box-shadow: 0 0 8px currentColor;
        }

        .badge-404 {
            background: #EEEDFE;
            border: 1px solid #AFA9EC;
            color: #3C3489;
        }

        .badge-500 {
            background: #FCEBEB;
            border: 1px solid #F09595;
            color: #A32D2D;
        }

        .badge-403 {
            background: #FAEEDA;
            border: 1px solid #EF9F27;
            color: #633806;
        }

        .badge-419 {
            background: #EEEDFE;
            border: 1px solid #AFA9EC;
            color: #3C3489;
        }

        .badge-default {
            background: #F1EFE8;
            border: 1px solid #B4B2A9;
            color: #444441;
        }

        .icon-404,
        .badge-dot-404 {
            background: #534AB7;
        }

        .icon-500,
        .badge-dot-500 {
            background: #E24B4A;
        }

        .icon-403,
        .badge-dot-403 {
            background: #BA7517;
        }

        .icon-419,
        .badge-dot-419 {
            background: #534AB7;
        }

        .icon-default,
        .badge-dot-default {
            background: #888780;
        }

        /* Typography */
        .error-title {
            font-size: 26px;
            font-weight: 800;
            color: #1A1A2E;
            letter-spacing: -0.5px;
            margin-top: 8px;
        }

        .error-message {
            font-size: 15px;
            color: #6B7280;
            line-height: 1.6;
            max-width: 380px;
        }

        /* Buttons Improved */
        .buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 12px;
            margin-top: 8px;
        }

        .btn-primary {
            background: var(--primary);
            color: white;
            padding: 14px 28px;
            border-radius: 14px;
            font-size: 15px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 15px rgba(83, 74, 183, 0.3);
        }

        .btn-primary:hover {
            background: var(--primary-light);
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(83, 74, 183, 0.4);
        }

        .btn-secondary {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(8px);
            color: #2C2C3E;
            padding: 14px 28px;
            border-radius: 14px;
            font-size: 15px;
            font-weight: 600;
            text-decoration: none;
            border: 1px solid #D0CCE8;
            transition: all 0.3s ease;
        }

        .btn-secondary:hover {
            background: #EEEDFE;
            border-color: var(--primary);
            color: var(--primary);
        }

        .info-box {
            background: #EEEDFE;
            border: 1px solid #D0CCE8;
            border-radius: 14px;
            padding: 14px 20px;
            font-size: 13px;
            color: var(--primary);
            line-height: 1.6;
            width: 100%;
            text-align: center;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.02);
        }

        /* Tambahan untuk mobile kecil */
        @media (max-width: 400px) {
            .error-digit {
                font-size: 70px;
            }

            .error-icon {
                width: 50px;
                height: 50px;
            }

            .buttons {
                flex-direction: column;
                width: 100%;
            }

            .btn-primary,
            .btn-secondary {
                width: 100%;
                justify-content: center;
            }
        }
    </style>
</head>

<body>

    <div class="overlay"></div>

    <div class="container">
        <a href="/" class="logo">BukuKu</a>

        @php
            $code = $exception->getStatusCode();
            $errors = [
                404 => [
                    'title' => 'Halaman tidak ditemukan',
                    'message' => 'Halaman yang kamu cari tidak ada atau sudah dipindahkan. Tenang, koleksi buku lainnya masih aman!',
                    'icon' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>',
                    'class' => '404',
                ],
                500 => [
                    'title' => 'Server sedang lelah',
                    'message' => 'Terjadi kendala teknis di sisi kami. Tim BukuKu sedang berusaha memperbaikinya secepat mungkin.',
                    'icon' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>',
                    'class' => '500',
                ],
                403 => [
                    'title' => 'Akses Terbatas',
                    'message' => 'Area ini memerlukan izin khusus atau token telah kadaluarsa.',
                    'icon' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0110 0v4"></path></svg>',
                    'class' => '403',
                ],
                419 => [
                    'title' => 'Sesi Berakhir',
                    'message' => 'Halaman ini sudah terbuka terlalu lama. Mari refresh agar kamu bisa melanjutkan aktivitas kembali.',
                    'icon' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"></polyline><polyline points="23 20 23 14 17 14"></polyline><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path></svg>',
                    'class' => '419',
                ],
            ];

            $error = $errors[$code] ?? [
                'title' => 'Ups! Terjadi Kesalahan',
                'message' => 'Sesuatu yang tidak terduga terjadi. Coba kembali ke beranda atau hubungi tim support kami.',
                'icon' => '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>',
                'class' => 'default',
            ];
        @endphp

        <div class="error-code">
    @php 
        $statusStr = (string) $code; 
    @endphp

    
    
    <span class="error-digit">{{ $statusStr }}</span>
    
</div>

        <div class="badge badge-{{ $error['class'] }}">
            <div class="badge-dot badge-dot-{{ $error['class'] }}"></div>
            Status Code {{ $code }}
        </div>

        <h1 class="error-title">{{ $error['title'] }}</h1>
        <p class="error-message">{{ $error['message'] }}</p>

        @if($code === 419)
            <div class="info-box">
                Keamanan sesi adalah prioritas kami. Cukup klik refresh untuk memulai sesi baru.
            </div>
        @endif

        <div class="buttons">
            <a href="/login" class="btn-primary">
                Login
            </a>
            @if($code === 419)
                <a href="javascript:location.reload()" class="btn-secondary">Refresh Sesi</a>
            @else
                <a href="javascript:history.back()" class="btn-secondary">Kembali</a>
            @endif
        </div>
    </div>
</body>

</html>