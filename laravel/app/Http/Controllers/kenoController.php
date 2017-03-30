<?php
namespace moneyhouse\Http\Controllers;
use Illuminate\Http\Request;
use moneyhouse\Http\Requests;
use moneyhouse\Http\Controllers\Controller;
use Illuminate\View\Middleware\ShareErrorsFromSession;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;

use Response; 

class kenoController extends Controller {
	public function resetKeno(Request $request) {
	
		$username = $request->session()->get('username');

		DB::table('keno')
			->where('username', $username)
			->update(['money' => 20]);

	}
	
	public function init(Request $request) {
		
		$username = $request->session()->get('username');
		$money = DB::table('keno')->where('username', $username)->pluck('money');
		return $money; 
	}
	
	public function saveKeno(Request $request) {
		
		$username = $request->session()->get('username');
		$money = $request->input('amount');

		DB::table('keno')
			->where('username', $username)
			->update(['money' => $money]);
	}
}