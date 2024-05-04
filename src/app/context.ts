import { cache } from "react";

export const createContext = <T>(initialValue: T) =>
    cache(() => {
        let value = initialValue;
        return {
            set: (newValue: Partial<T>) => {
                value = { ...value, ...newValue };
            },
            get: () => value
        };
    });

// 初期値として複数のプロパティを持つオブジェクトを設定
export const context = createContext({ targetImage: "", takePicture: "" });


