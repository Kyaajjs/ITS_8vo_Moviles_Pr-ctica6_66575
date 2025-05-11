import React, { useEffect, useState, useContext } from 'react';
import {
  IonList,
  IonItem,
  IonLabel,
  IonThumbnail,
  IonImg
} from '@ionic/react';

import './PackPage.css';
import ObjectDetail from '../components/ObjectDetails';
import { MenuPokedexContext, EPokedexMenuOption, EPokedexScreen } from '../contexts/MenuPokedexContext';

const PackPage: React.FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedObjectDetail, setSelectedObjectDetail] = useState<any | null>(null);

  const { setScreen, setMenuOption } = useContext(MenuPokedexContext);

  // Mapeo manual de categorías comunes a español
  const categoryTranslation: { [key: string]: string } = {
    "ball": "Bola",
    "potion": "Poción",
    "tm": "Máquina Técnica",
    "berry": "Baya",
    "key": "Llave",
    "evolutionary-stone": "Piedra Evolutiva",
    // Puedes agregar más categorías aquí si es necesario
  };

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/item?limit=50');
      const data = await response.json();

      const itemsWithNames = await Promise.all(
        data.results.map(async (item: any) => {
          const res = await fetch(item.url);
          const fullData = await res.json();
          const nameEs = fullData.names.find((n: any) => n.language.name === 'es')?.name || item.name;
          return {
            ...item,
            localizedName: nameEs
          };
        })
      );

      setItems(itemsWithNames);
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const handleUp = () => {
      if (selectedObjectDetail) {
        document.getElementById("object-detail")?.scrollBy({ top: -50, behavior: 'smooth' });
      } else {
        setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
      }
    };

    const handleDown = () => {
      if (selectedObjectDetail) {
        document.getElementById("object-detail")?.scrollBy({ top: 50, behavior: 'smooth' });
      } else {
        setSelectedIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
      }
    };

    const handleSelect = async () => {
      if (selectedObjectDetail) return;
      const item = items[selectedIndex];

      // ⚠️ Datos manuales para pokéballs
      const extraBallData: Record<string, { captureRate: number }> = {
        "poke-ball": { captureRate: 255 },
        "great-ball": { captureRate: 200 },
        "ultra-ball": { captureRate: 150 },
        "master-ball": { captureRate: 255 },
        "net-ball": { captureRate: 150 },
        "dive-ball": { captureRate: 150 },
        "nest-ball": { captureRate: 150 },
        "repeat-ball": { captureRate: 150 },
        "timer-ball": { captureRate: 150 },
        "luxury-ball": { captureRate: 255 },
        "premier-ball": { captureRate: 255 },
        "quick-ball": { captureRate: 150 },
        "dusk-ball": { captureRate: 150 },
        "heal-ball": { captureRate: 255 },
        "friend-ball": { captureRate: 255 },
        "level-ball": { captureRate: 255 }
      };

      try {
        const res = await fetch(item.url);
        const data = await res.json();

        const flavorEs = data.flavor_text_entries.find((f: any) => f.language.name === 'es');
        const flavorEn = data.flavor_text_entries.find((f: any) => f.language.name === 'en');

        const nameEs = data.names.find((n: any) => n.language.name === 'es')?.name;

        // Aquí se obtiene la categoría y se traduce a español
        let categoryEs = '';
        if (data.category?.url) {
          const categoryRes = await fetch(data.category.url);
          const categoryData = await categoryRes.json();
          categoryEs = categoryData.names.find((c: any) => c.language.name === 'es')?.name || data.category.name;
        }

        // Si no se encuentra en español, se busca en el mapeo manual
        const categoryInSpanish = categoryTranslation[categoryEs.toLowerCase()] || categoryEs || 'desconocida';

        const attributeTranslations: Record<string, string> = {
          "usable-overworld": "Usable fuera de combate",
          "usable-in-battle": "Usable en combate",
          "countable": "Contable",
          "consumable": "Consumible",
          "holdable": "Equipable",
          "holdable-active": "Equipable (activo)",
          "holdable-passive": "Equipable (pasivo)",
          "underground": "Usable en Subsuelo",
          "collectible": "Coleccionable"
        };

        const attributes = await Promise.all(
          (data.attributes || []).map(async (attr: any) => {
            const attrRes = await fetch(attr.url);
            const attrData = await attrRes.json();
            const attrEs = attrData.names.find((n: any) => n.language.name === 'es')?.name;
            return attrEs || attributeTranslations[attr.name] || attr.name;
          })
        );

        let flingEffect = null;
        if (data.fling_effect) {
          const flingRes = await fetch(data.fling_effect.url);
          const flingData = await flingRes.json();
          const flingEs = flingData.names.find((n: any) => n.language.name === 'es')?.name;
          flingEffect = flingEs || data.fling_effect.name;
        }

        const flingPower = data.fling_power !== null ? data.fling_power : undefined;
        const captureRate = extraBallData[item.name]?.captureRate;

        setSelectedObjectDetail({
          name: item.name,
          localizedName: nameEs,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`,
          flavorText: flavorEs?.text || flavorEn?.text || 'Sin descripción disponible',
          cost: data.cost || 0,
          category: categoryInSpanish,  // Usar la categoría traducida
          localizedCategory: categoryEs,
          attributes,
          isDiscardable: data.is_discardable ?? false,
          isConsumable: data.is_consumable ?? false,
          flingEffect: flingEffect ?? 'Sin efecto de lanzamiento',
          flingPower,
          captureRate
        });

        setScreen(EPokedexScreen.PACK);
      } catch (error) {
        console.error("Error fetching item details", error);
      }
    };

    const handleBack = () => {
      if (selectedObjectDetail) {
        setSelectedObjectDetail(null);
        setScreen(EPokedexScreen.PACK);
      } else {
        setScreen(EPokedexScreen.MENU);
        setMenuOption(EPokedexMenuOption.PACK);
        window.location.href = '/home';
      }
    };

    window.addEventListener('cross-up', handleUp);
    window.addEventListener('cross-down', handleDown);
    window.addEventListener('cross-select', handleSelect);
    window.addEventListener('cross-back', handleBack);

    return () => {
      window.removeEventListener('cross-up', handleUp);
      window.removeEventListener('cross-down', handleDown);
      window.removeEventListener('cross-select', handleSelect);
      window.removeEventListener('cross-back', handleBack);
    };
  }, [items, selectedIndex, selectedObjectDetail, setScreen, setMenuOption]);

  useEffect(() => {
    const selectedItem = document.getElementById(`item-${selectedIndex}`);
    selectedItem?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [selectedIndex]);

  if (selectedObjectDetail) {
    return (
      <div id="object-detail" className="object-detail-screen hide-scrollbar" style={{ overflowY: 'auto', height: '100%' }}>
        <ObjectDetail
          name={selectedObjectDetail.name}
          localizedName={selectedObjectDetail.localizedName}
          image={selectedObjectDetail.image}
          flavorText={selectedObjectDetail.flavorText}
          cost={selectedObjectDetail.cost}
          category={selectedObjectDetail.category}  // Aquí se pasa la categoría en español
          localizedCategory={selectedObjectDetail.localizedCategory}
          attributes={selectedObjectDetail.attributes}
          isDiscardable={selectedObjectDetail.isDiscardable}
          isConsumable={selectedObjectDetail.isConsumable}
          flingEffect={selectedObjectDetail.flingEffect}
          flingPower={selectedObjectDetail.flingPower}
          captureRate={selectedObjectDetail.captureRate}
          onBack={() => setSelectedObjectDetail(null)}
        />
      </div>
    );
  }

  return (
    <div className="hide-scrollbar" style={{
      height: '100%',
      fontFamily: 'Pokemon GB',
      fontSize: '12px',
      color: '#003300',
      paddingRight: '4px'
    }}>
      <IonList style={{ background: 'transparent' }}>
        {items.map((item, index) => (
          <IonItem
            key={index}
            id={`item-${index}`}
            lines="none"
            className={`item-entry ${index === selectedIndex ? 'selected-entry' : ''}`}
          >
            <IonThumbnail slot="start" style={{ width: '40px', height: '40px' }}>
              <IonImg
                className="item-image float-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${item.name}.png`}
                alt={item.name}
              />
            </IonThumbnail>
            <IonLabel className="item-label">{item.localizedName || item.name}</IonLabel>
          </IonItem>
        ))}
      </IonList>
    </div>
  );
};

export default PackPage;
