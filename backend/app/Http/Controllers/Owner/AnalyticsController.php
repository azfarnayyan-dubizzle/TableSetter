<?php

namespace App\Http\Controllers\Owner;

use App\Http\Controllers\Controller;
use App\Models\Restaurant;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class AnalyticsController extends Controller
{
    /**
     * Revenue, visits, rating trend, and rating distribution for a
     * single restaurant, scoped to the last 6 months.
     *
     * Revenue/visits come from dining_logs -- this is the only source
     * of "how much customers spend here" data, since there is no
     * order-level table in this schema, only self-reported dining logs.
     */
    public function restaurant(Request $request, Restaurant $restaurant)
    {
        abort_if(
            $restaurant->owner_id !== $request->user()->id,
            403,
            'You do not own this restaurant.'
        );

        $months = collect(range(5, 0))->map(fn ($i) => Carbon::now()->subMonths($i));

        $revenueTrend = $months->map(function (Carbon $month) use ($restaurant) {
            $total = $restaurant->diningLogs()
                ->whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->sum('amount_spent');

            return [
                'month' => $month->format('Y-m'),
                'label' => $month->format('M'),
                'total' => round((float) $total, 2),
            ];
        })->values();

        $ratingTrend = $months->map(function (Carbon $month) use ($restaurant) {
            $avg = $restaurant->reviews()
                ->whereYear('created_at', $month->year)
                ->whereMonth('created_at', $month->month)
                ->avg('rating');

            return [
                'month' => $month->format('Y-m'),
                'label' => $month->format('M'),
                'avg_rating' => $avg !== null ? round((float) $avg, 2) : null,
            ];
        })->values();

        $ratingDistribution = collect(range(1, 5))->map(fn ($star) => [
            'rating' => $star,
            'count' => $restaurant->reviews()->where('rating', $star)->count(),
        ])->values();

        $totalReviews = $restaurant->reviews()->count();
        $repliedReviews = $restaurant->reviews()->whereHas('reply')->count();

        return response()->json([
            'total_revenue' => round((float) $restaurant->diningLogs()->sum('amount_spent'), 2),
            'visit_count' => $restaurant->diningLogs()->count(),
            'avg_spend_per_visit' => $restaurant->diningLogs()->count() > 0
                ? round((float) $restaurant->diningLogs()->avg('amount_spent'), 2)
                : 0,
            'revenue_trend' => $revenueTrend,
            'rating_trend' => $ratingTrend,
            'rating_distribution' => $ratingDistribution,
            'avg_rating' => (float) $restaurant->avg_rating,
            'reviews_count' => $totalReviews,
            'reply_rate' => $totalReviews > 0 ? round(($repliedReviews / $totalReviews) * 100, 1) : 0,
        ]);
    }
}
