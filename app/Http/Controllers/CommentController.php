<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feature;
use App\Models\Comment;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'comment' => 'required|string|max:255',
        ]);

        $data['feature_id'] = $feature->id;
        $data['user_id'] = Auth::id();

        Comment::create($data);

        return to_route('feature.show', $feature);
    }

    public function destroy(Comment $comment)
    {
        if($comment->user_id !== Auth::id())
        {
            abort(403);
        }

        $featureID = $comment->feature_id;
        $comment->delete();

        return to_route('feature.show', $featureID);
    }
}
