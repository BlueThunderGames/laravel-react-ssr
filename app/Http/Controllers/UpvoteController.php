<?php

namespace App\Http\Controllers;

use App\Models\Upvote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UpvoteController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'feature_id' => 'required|exists:features,id',
            'upvote' => 'required|boolean',
        ]);

        Upvote::updateOrCreate(
            [
                'feature_id' => $data['feature_id'],
                'user_id' => Auth::id(),

            ],
            ['upvote' => $data['upvote']]
        );

        return to_route('feature.index');
    }
}
