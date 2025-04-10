import { AutoBot } from '../../components/BoostComponents/AutoBot.jsx'
import { ImproveTap } from '../../components/BoostComponents/ImproveTap.jsx'
import { Skins } from '../../components/BoostComponents/Skins.jsx'
import { SkinsPur } from '../../components/BoostComponents/SkinsPur.jsx'

import 'sweetalert2/src/sweetalert2.scss'
import { ImproveEnergy } from '../../components/BoostComponents/ImproveEnergy.jsx'
import { BottomMenuWithoutEnergy } from '../../components/BottomMenu/BM_wit_energy.jsx'

import { useState } from 'react'
import styles from './boost.module.scss'

export function Boost() {
  const [priceData, setPriceData] = useState({
    tap: 0,
    energy: 0,
  });

  return (
    <>
      <div className="Boost">
        <div className={styles.improves}>
          <ImproveTap
            setTapPrice={(energyPrice) =>
              setPriceData((prevState) => ({
                ...prevState,
                tap: energyPrice,
              }))
            }
          />
          <ImproveEnergy
            setEnergyPrice={(energyPrice) =>
              setPriceData((prevState) => ({
                ...prevState,
                energy: energyPrice,
              }))
            }
          />
        </div>
        <AutoBot />
        <Skins title={'Skins on sale'} description={'Skins'} />
        <SkinsPur title={'Purchased skins'} description={'Purchased skins'} />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
      </div>
      <BottomMenuWithoutEnergy />
    </>
  );
}
