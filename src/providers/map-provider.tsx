// マップがクライアントサイドでロードされ、表示されるための指定
'use client';

// 外部ライブラリや自プロジェクトから必要なモジュールや関数をインポート
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

// Google Maps APIからロードするライブラリのリストを定義
const libraries = ['places', 'drawing', 'geometry'];

// childrenプロパティを取るMapProviderという関数コンポーネントを定義
export default function MapProvider({ children }: { children: ReactNode }) {

    // Google Maps JavaScript APIを非同期的にロード
    const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.GOOGLE_MAP_API_KEY ?? '',
        libraries: libraries as Libraries,
    });

    // Google Mapsのロード中にエラーが発生した場合
    if (loadError) return <p>Google Mapsのロード中にエラーが発生しました</p>

    // スクリプトがまだロードされていない場合
    if (!scriptLoaded) return <p>マップスクリプトをロード中...</p>
    // このMapProviderコンポーネントによってラップされたchildrenプロパティを返す
    return <>{children}</>;
}
