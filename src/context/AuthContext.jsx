import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../assets/supabase-client";

const AuthContext = createContext();

async function fetchProfileRole(userId) {
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userId)
        .maybeSingle();

    return profile?.role ?? null;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(() => Boolean(supabase));

    useEffect(() => {
        if (!supabase) {
            return undefined;
        }

        let active = true;

        async function syncSession({ showLoading = false } = {}) {
            if (showLoading) {
                setLoading(true);
            }

            try {
                const { data } = await supabase.auth.getUser();

                if (!active) return;

                if (data.user) {
                    setUser(data.user);
                    const nextRole = await fetchProfileRole(data.user.id);
                    if (!active) return;
                    setRole(nextRole);
                } else {
                    setUser(null);
                    setRole(null);
                }
            } catch (error) {
                console.error("Auth session sync failed:", error);
                if (!active) return;
                setUser(null);
                setRole(null);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        syncSession({ showLoading: true });

        const { data: listener } = supabase.auth.onAuthStateChange(() => {
            syncSession({ showLoading: false });
        });

        return () => {
            active = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    const login = async (email, password) => {
        if (!supabase) {
            return {
                data: { user: null, session: null },
                error: { message: "Supabase config is missing" },
            };
        }

        setLoading(true);

        try {
            const result = await supabase.auth.signInWithPassword({ email, password });

            if (result.error || !result.data?.user) {
                setUser(null);
                setRole(null);
                return result;
            }

            setUser(result.data.user);
            const nextRole = await fetchProfileRole(result.data.user.id);
            setRole(nextRole);

            return {
                ...result,
                data: {
                    ...result.data,
                    role: nextRole,
                },
            };
        } catch (error) {
            console.error("Login failed:", error);
            setUser(null);
            setRole(null);
            return {
                data: { user: null, session: null, role: null },
                error: { message: error?.message || "Login failed" },
            };
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        if (supabase) {
            await supabase.auth.signOut();
        }
        setUser(null);
        setRole(null);
    };

    return (
        <AuthContext.Provider value={{ user, role, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
