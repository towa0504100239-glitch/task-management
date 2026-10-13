
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type Player = {
  id: number;
  level: number;
  xp: number;
};

type PlayerContextType = {
  player: Player | null;
  requiredXp: number;
  xpPercentage: number;
  refreshPlayer: () => Promise<void>;
};

const PlayerContext =
  createContext<PlayerContextType | undefined>(
    undefined
  );

export function PlayerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [player, setPlayer] =
    useState<Player | null>(null);

  const refreshPlayer = async () => {
    const response = await fetch(
      "http://localhost:8080/api/player"
    );

    if (!response.ok) {
      throw new Error(
        "プレイヤー情報の取得に失敗しました"
      );
    }

    const data: Player = await response.json();
    setPlayer(data);
  };

  useEffect(() => {
    refreshPlayer().catch(console.error);
  }, []);

  const requiredXp = player
    ? 100 + (player.level - 1) * 50
    : 100;

  const xpPercentage = player
    ? Math.min(
        (player.xp / requiredXp) * 100,
        100
      )
    : 0;

  return (
    <PlayerContext.Provider
      value={{
        player,
        requiredXp,
        xpPercentage,
        refreshPlayer,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error(
      "usePlayer must be used inside PlayerProvider"
    );
  }

  return context;
}
