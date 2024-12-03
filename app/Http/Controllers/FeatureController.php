<?php

namespace App\Http\Controllers;

use App\Models\Feature;
use App\Models\Upvote;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\FeatureResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;



class FeatureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $currentUserID = Auth::id();

        $paginated = Feature::latest()
        ->withCount(['upvotes as upvote_count' => function ($query)
        {
            $query->select(DB::raw('SUM(CASE WHEN upvote = 1 THEN 1 ELSE -1 END)'));

        }])
        ->withExists([
            'upvotes as user_has_upvoted' => function ($query) use($currentUserID)
            {
                $query->where('user_id', $currentUserID)
                ->where('upvote', 1);
            },
            'upvotes as user_has_downvoted' => function ($query) use($currentUserID)
            {
                $query->where('user_id', $currentUserID)
                ->where('upvote', 0);
            },
            ])
        ->paginate(10);

        return Inertia::render('Features/Index', [
            'features' => FeatureResource::collection($paginated)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Features/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        $data['user_id'] = Auth::id();

        Feature::create($data);

        return to_route('feature.index')->with('success', 'Feature created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Feature $feature)
    {
        $currentUserID = Auth::id();
        $feature->upvote_count = Upvote::where('feature_id', $feature->id)
        ->sum(DB::raw('CASE WHEN upvote = 1 THEN 1 ELSE -1 END'));

        $feature->user_has_upvoted = Upvote::where('feature_id', $feature->id)
        ->where('user_id', $currentUserID)
        ->where('upvote', 1)
        ->exists();

        $feature->user_has_downvoted = Upvote::where('feature_id', $feature->id)
        ->where('user_id', $currentUserID)
        ->where('upvote', 0)
        ->exists();

        return Inertia::render('Features/Show', [
            'feature' => new FeatureResource($feature)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Feature $feature)
    {
        return Inertia::render('Features/Edit', [
            'feature' => new FeatureResource($feature)
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Feature $feature)
    {
        $data = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string'],
        ]);

        $feature->update($data);

        return to_route('feature.index')->with('success', 'Feature updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Feature $feature)
    {
        $feature->delete();

        return to_route('feature.index')->with('success', 'Feature deleted successfully.');
    }
}
