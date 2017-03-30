<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
	
    return view('welcome');
});

Route::get('/blackjack', function() {
	return view('blackjack'); 
});

Route::get('/signUp', function() {
	return view('signUp'); 
});

Route::get('/loginPage', function() {
	return view('login'); 
});

Route::get('/homePage', function() {
	return view('homePage'); 
});

Route::get('/keno', function() {
	return view('keno'); 
});

Auth::routes();

Route::post('/createUser', 'signUpController@confirm'); 

Route::post('/loginUser', 'signUpController@login');

Route::get('/home', 'HomeController@index');

Route::get('/wins_req', 'blackjackController@wins'); 

Route::post('/save_req', 'blackjackController@save'); 

Route::post('/reset', 'kenoController@resetKeno'); 

Route::post('/kenoInit', 'kenoController@init'); 

Route::post('/saveKeno', 'kenoController@saveKeno');
