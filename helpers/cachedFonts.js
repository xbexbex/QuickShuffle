import { Font } from 'expo'

export const cachedFonts = fonts => fonts.map(font => Front.loadAsync(font));