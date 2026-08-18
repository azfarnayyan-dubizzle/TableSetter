<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\StoreDiningLogRequest;
use App\Http\Requests\Customer\UpdateDiningLogRequest;
use App\Http\Resources\DiningLogResource;
use App\Models\DiningLog;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DiningLogController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->user()->customer->diningLogs()->with('restaurant')->latest();

        if ($request->filled('month')) {
            $date = Carbon::parse($request->query('month'));
            $query->whereYear('created_at', $date->year)
                  ->whereMonth('created_at', $date->month);
        }

        return DiningLogResource::collection($query->get());
    }

    public function store(StoreDiningLogRequest $request)
    {
        $log = $request->user()->customer->diningLogs()->create($request->validated());

        return new DiningLogResource($log);
    }

    public function update(UpdateDiningLogRequest $request, DiningLog $diningLog)
    {
        $this->authorizeOwnership($request, $diningLog);

        $diningLog->update($request->validated());

        return new DiningLogResource($diningLog);
    }

    public function destroy(Request $request, DiningLog $diningLog)
    {
        $this->authorizeOwnership($request, $diningLog);

        $diningLog->delete();

        return response()->json(null, 204);
    }

    public function summary(Request $request)
    {
        $date = $request->filled('month')
            ? Carbon::parse($request->query('month'))
            : Carbon::now();

        $entries = $request->user()->customer->diningLogs()
            ->whereYear('created_at', $date->year)
            ->whereMonth('created_at', $date->month)
            ->get();

        return response()->json([
            'month' => $date->format('Y-m'),
            'total_spent' => round($entries->sum('amount_spent'), 2),
            'entry_count' => $entries->count(),
        ]);
    }

    private function authorizeOwnership(Request $request, DiningLog $diningLog): void
    {
        abort_if(
            $diningLog->customer_id !== $request->user()->id,
            403,
            'You can only manage your own dining log entries.'
        );
    }
}
