import React from 'react';
import './PokemonDetail.css';

interface PokemonDetailProps {
  name: string;
  image: string;
  stats: { name: string; value: number }[];
  onBack: () => void;
}

// Diccionario de traducciones para las estadísticas
const statTranslations: { [key: string]: string } = {
  hp: 'Puntos de Salud',
  attack: 'Ataque',
  defense: 'Defensa',
  'special-attack': 'Ataque Especial',
  'special-defense': 'Defensa Especial',
  speed: 'Velocidad',
};

const PokemonDetail: React.FC<PokemonDetailProps> = ({ name, image, stats, onBack }) => {
  return (
    <div className="pokemon-detail-screen">
      <div className="detail-image-container">
        <img src={image} alt={name} />
      </div>
      <div className="detail-info">
        <h3>{name}</h3>
        <ul>
          {stats.map((s, i) => (
            <li key={i}>
              <strong>{statTranslations[s.name] || s.name}:</strong> <span>{s.value}</span>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default PokemonDetail;
