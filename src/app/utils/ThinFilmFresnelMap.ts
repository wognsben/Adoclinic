import * as THREE from 'three';

/**
 * Thin Film Fresnel Effect
 * Creates iridescent soap bubble-like rainbow shimmer on surfaces
 * Based on David Lenaerts' implementation
 */
export class ThinFilmFresnelMap {
  private filmTexture: THREE.DataTexture;

  constructor(
    filmThickness = 380.0,
    refractiveIndexFilm = 2.0,
    refractiveIndexBase = 3.0
  ) {
    const size = 64;
    const data = new Uint8Array(size * size * 4);

    const filmThicknessNormalized = filmThickness / 1000.0;

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const x = i / size;
        const y = j / size;

        // Fresnel calculation
        const angle = Math.acos(1.0 - x);
        const d = 2.0 * Math.PI * filmThicknessNormalized * refractiveIndexFilm * Math.cos(angle);
        
        // RGB interference
        const r = this.interference(d, 650); // Red wavelength
        const g = this.interference(d, 510); // Green wavelength  
        const b = this.interference(d, 475); // Blue wavelength

        const idx = (i + j * size) * 4;
        data[idx] = r * 255;
        data[idx + 1] = g * 255;
        data[idx + 2] = b * 255;
        data[idx + 3] = 255;
      }
    }

    this.filmTexture = new THREE.DataTexture(
      data,
      size,
      size,
      THREE.RGBAFormat
    );
    this.filmTexture.needsUpdate = true;
  }

  private interference(delta: number, wavelength: number): number {
    const phase = (delta * 1000.0) / wavelength;
    const intensity = Math.cos(phase) * 0.5 + 0.5;
    return Math.pow(intensity, 2);
  }

  public getTexture(): THREE.DataTexture {
    return this.filmTexture;
  }
}
