<?php
namespace moneyhouse\Http\Controllers;
use Illuminate\Http\Request;
use moneyhouse\Http\Requests;
use moneyhouse\Http\Controllers\Controller;
use Illuminate\View\Middleware\ShareErrorsFromSession;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;

use Response; 

class blackjackController extends Controller {
	public function wins(Request $request) {
		
		$username = $request->session()->get('username'); 

		$wins = DB::table('blackjack')->where('username', $username)->pluck('win');
		$losses = DB::table('blackjack')->where('username', $username)->pluck('loss');
		
		$arr = array(
			'wins'=>$wins,
			'losses'=>$losses,
			'username'=>$username
		);
		
		return $arr; 
	}
	
	public function save(Request $request) {
		$username = $request->session()->get('username'); 
		
		$wins = $request->input('wins');
		$losses = $request->input('losses'); 
		
		DB::table('blackjack')
			->where('username', $username)
			->update(['win' => $wins, 'loss' => $losses]);
	}
}