/**
 * hooks/useFavorite.ts
 * Client-side hook to add/remove favorites
 * Requires user to be logged in (redirects to /masuk if not)
 */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "../lib/auth-client";
import { useRouter } from "next/navigation";

export interface FavoritePayload {
  itemType: "card" | "theme" | "image";
  itemRef: string;
  title?: string;
  imageUrl?: string;
  creator?: string;
  sourceUrl?: string;
  license?: string;
}

export function useFavorite(itemType: string, itemRef: string) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isFav, setIsFav] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if this item is already favorited
  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/favorite")
      .then((r) => r.json())
      .then(({ favorites }) => {
        if (Array.isArray(favorites)) {
          setIsFav(
            favorites.some(
              (f: { item_type?: string; itemType?: string; item_ref?: string; itemRef?: string }) =>
                (f.item_type === itemType || f.itemType === itemType) &&
                (f.item_ref === itemRef || f.itemRef === itemRef)
            )
          );
        }
      })
      .catch(() => {});
  }, [session, itemType, itemRef]);

  const toggle = useCallback(
    async (payload: FavoritePayload) => {
      if (!session?.user) {
        router.push("/masuk");
        return;
      }
      setLoading(true);
      try {
        if (isFav) {
          await fetch("/api/favorite", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ itemType, itemRef }),
          });
          setIsFav(false);
        } else {
          await fetch("/api/favorite", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          setIsFav(true);
        }
      } catch {
        // Silently fail, keep state as is
      } finally {
        setLoading(false);
      }
    },
    [session, isFav, itemType, itemRef, router]
  );

  return { isFav, toggle, loading, isLoggedIn: !!session?.user };
}
