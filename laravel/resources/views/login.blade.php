<html>
	<head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

		<meta name="csrf-token" content="{{ csrf_token() }}" />	
        <title>Moneyhouse</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
	
		<title>Sign Up</title>
	
		<style>
            html, body {
                background-color: #fff;
                color: #636b6f;
                font-family: 'Raleway', sans-serif;
                font-weight: 100;
                height: 100vh;
                margin: 0;
            }

            .full-height {
                height: 100vh;
            }

            .flex-center {
                align-items: center;
                display: flex;
                justify-content: center;
            }

            .position-ref {
                position: relative;
            }

            .top-right {
                position: absolute;
                right: 10px;
                top: 18px;
            }

            .content {
				text-align: center;
            }

            .title {
                font-size: 60px;
            }

            .links > a {
                color: #636b6f;
                padding: 0 25px;
                font-size: 12px;
                font-weight: 600;
                letter-spacing: .1rem;
                text-decoration: none;
                text-transform: uppercase;
            }

            .m-b-md {
                margin-bottom: 30px;
            }
			
			label{
				display:inline-block;
				width:200px;
				margin-right:30px;
				text-align:right;
			}

			input{

			}

			fieldset{
				border:none;
				width:500px;
				margin:0px auto;
			}
        </style>
	
	</head>
	<body>
	
		<div class="content">
			<div class="title m-b-md">
			Login
			</div>
		</div>
		
		@if (count($errors) > 0)
			<div class="alert alert-danger">
				<ul>
					@foreach ($errors->all() as $error)
						<font color="red"><li><b>{{ $error }}</b></li></font>
					@endforeach
				</ul>
			</div>
		@endif
	
		<div style="width: 550px; margin:0 auto;">
			<form method="post" action="/loginUser">
				<label for="username">
					<b>Username</b>
				</label>
				<input type="text" id="username" name="username"/>
				
				<br>
				
				<label for="password">
					<b>Password</b>
				</label>
				<input type="password" id="password" name="password"/>
				
				<br><br>
				
				<div style="width: 0px; margin:0 auto;">
					<button type="submit">Login</button>
				</div>
				
				<input type="hidden" name="_token" value="{{ csrf_token() }}">
				
			</form>
		</div>
   
	</body>
</html>