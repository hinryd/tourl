import create from 'zustand'

export const useStore = create<any>(set => {
    return {
        url: '',
        appState: 'idle',

        setUrl: (newUrl: string) => set({ url: newUrl }),
        idle: () => set({ appState: 'idle' }),
        loading: () => set({ appState: 'loading' }),
        error: () => set({ appState: 'error' }),
        success: () => set({ appState: 'success' })
    }
})
