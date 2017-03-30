<?php
namespace moneyhouse\Http\Controllers;
use Illuminate\Http\Request;
use moneyhouse\Http\Requests;
use moneyhouse\Http\Controllers\Controller;
use Illuminate\View\Middleware\ShareErrorsFromSession;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;


class signUpController extends Controller {
	public function confirm(Request $request) {

		$this->validate($request, [
			'username' => 'required',
			'password' => 'required|confirmed',
			'password_confirmation' => 'required',
		]);
		
		$username = $request->input('username');
		$password = $request->input('password');

		DB::insert('insert into gamblers (username, password) values (?, ?)', [$username, $password]);
		DB::table('blackjack')->insert(
			['win' => 0, 'loss' => 0, 'username' => $username]
		);
		DB::table('keno')->insert(
			['money' => 0, 'username' => $username]
		);
		
		return redirect('/'); 
	}
	
	public function login(Request $request) {
		
		$username = $request->input('username');
		$password = $request->input('password');
		
		$users = DB::select('select password from gamblers where username = ?', [$username]);
		
		if(empty($users)) {
			return redirect('/loginPage'); 
		}
		else {
			if($users[0]->password == $password) {
				$request->session()->put('username', $username); 
				return redirect("/homePage");
			}
			else {
				return redirect('/loginPage');
			}
		}
	}
}