import React, { useContext, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei'
import displayLevels from './displayLevels';
import getCameraAndLights from './cameraAndLights';
import { get_cityMapData } from "../../js/versiodb-api-helper";
import { SettingsContext } from '../settingsController';
import { EntityPicker, SplitView, SplitViewLeft, SplitViewRight, StateController } from '../helpercomponent';
import useUrlParameter from '../../hooks/useUrlParameter';
import TopologyDropdown from '../form/topologyDropdown';
import "./3d-analysis.css";
import { VersioBool } from '../form-components';
import { Link } from 'react-router-dom';
import { ROUTES, QUARY_PARAMETER_NAMES } from '../../conf/conf-gui';
import citymapConfiguration from "../../shared-utils/conf/citymap";


const Analysis3D = () => {
  return (
    <div className="componentwrapper">
      <h1>City map analysis (early adopter) </h1>
      <p>All instances as boxes grouped by entity type. Please click on the boxes to view the information about them.</p>

      <CityMap />
    </div>
  );
};

export default Analysis3D;

const CityMap = () => {
  const settings = useContext(SettingsContext);
  const [entity, set_entity] = useUrlParameter("tdae", undefined);
  let [topologyId, set_topologyId] = useUrlParameter("tdat", undefined);
  if (topologyId && !isNaN(parseInt(topologyId))) {
    topologyId = parseInt(topologyId);
  }

  const [loading, setLoading] = useState(true);
  const [levels, setLevels] = useState([]);
  const [legends, setLegends] = useState();
  const [mainLevel, setMainLevel] = useState([]);
  const [visulaSettings, setVisualSettings] = useState();
  const [active, setActive] = useState({});
  const [levelsAndBoxesData, setLevelsAndBoxesData] = useState();
  const [numberOfBoxesAndLevels, setNumberOfBoxesAndLevels] = useState({});
  const [boxesColored, setBoxesColored] = useState(true);
  const [levelsColored, setLevelsColored] = useState(true);
  const [shadows, setShadows] = useState(false);
  const [sortType] = useState("highInCenter");
  const [renderCapacity, setRenderCapacity] = useState(false);


  const init = async () => {
    setLoading(true);

    const response = await get_cityMapData({ settings }, { entity: entity, topologyId: topologyId, sortType });

    // calculate the nr of boxes and levels
    var nrOfboxes = 0;
    for (let index = 0; index < response.levels.length; index++) {
      const element = response.levels[index];
      nrOfboxes += element.boxes.length
    }

    const boxesAndLevel = {
      boxes: nrOfboxes,
      levels: response.levels.length
    }
    setNumberOfBoxesAndLevels(boxesAndLevel)

    if (nrOfboxes >= 10000) {
      setRenderCapacity(true);
    }

    return response;

  };

  useEffect(() => {
    const start = async () => {
      const levelsAndBoxesData = await init();

      setLevelsAndBoxesData(levelsAndBoxesData);

      const cameraAndLightsSettings = getCameraAndLights(levelsAndBoxesData);

      const mainLevel3D = (<MainLevel size={levelsAndBoxesData._sizesMainLevel} levPos={cameraAndLightsSettings.levelPosition} />)

      setMainLevel(mainLevel3D);

      setVisualSettings(cameraAndLightsSettings);

      setLoading(false);

    }
    start();
  }, [entity, topologyId, sortType]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!loading) {
      const buildComponents = displayLevels(levelsAndBoxesData, visulaSettings.levelPosition, setActive, active, settings, shadows, boxesColored, levelsColored);
      setLevels(buildComponents.levels);
      setLegends(buildComponents.legends);
    }
  }, [active, loading, shadows, boxesColored, levelsColored]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <div>
      loading...
    </div>
  }

  const SplitViewWidth = 350;
  return (
    <div className="cityMapPage">
      <SplitView>
        <SplitViewLeft width={SplitViewWidth} >
          <EntityPicker settings={settings} value={entity} label="Entity" onChange={(e, { value }) => set_entity(value ? value : undefined)} clearable />
          <TopologyDropdown onChange={(topologyId, topologyResult) => set_topologyId(topologyId)} value={topologyId} returnTopology={false} />

          <div className='title'>
            <span >Statistics</span>
          </div>

          <div className='KeyValueList' >

            <div className='KeyValue'>
              <div className='KeyValue-Key'>
                <span>Total levels</span>
              </div>
              <div>
                <div className='KeyValue-Value descriptionWidth'>
                  {numberOfBoxesAndLevels.levels}
                </div>
              </div>
            </div>
            <div className='KeyValue'>
              <div className='KeyValue-Key'>
                <span>Total Boxes</span>
              </div>
              <div>
                <div className='KeyValue-Value descriptionWidth'>
                  {numberOfBoxesAndLevels.boxes}
                </div>
              </div>
            </div>
          </div>

          <div>
            {renderCapacity ?
              <p className="warning">10.000 viewable entities reached.<br/>Entities exceeding this number will not be display.<br/>Please reduce the data size.</p> : null}
          </div>

          <div className='title'>
            <span >Selected box</span>
          </div>

          <div className='subtitle'>
            <span>Details</span>
          </div>

          <div className='KeyValueList' >

            <div className='KeyValue'>
              <div className='KeyValue-Key'>
                <span>Level</span>
              </div>
              <div>
                <div className='KeyValue-Value descriptionWidth'>
                  {active.levelId}
                  
                </div>
              </div>
            </div>
            <div className='KeyValue'>
              <div className='KeyValue-Key'>
                <span>Box</span>
              </div>
              <div>
                <div className='KeyValue-Value descriptionWidth' >
                  <Link to={ROUTES.instance + "?" + QUARY_PARAMETER_NAMES.environmentId + "=" + settings.environment + "&" + QUARY_PARAMETER_NAMES.entityId + "=" + active.levelId + "&" + QUARY_PARAMETER_NAMES.instanceId + "=" + active.boxId}>
                    {active.boxName}
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className='subtitle'>
            <span>Box KPIs</span>
          </div>

          <div className='KeyValueList' >

            <div className='KeyValue'>
              <div className='KeyValue-Key'>
                <span>Height</span>
              </div>
              <div>
                <div className='KeyValue-Value descriptionWidth'>
                  {active.lastChangeInHours}
                </div>
              </div>
            </div>

            <div className='KeyValue'>
              <div className='KeyValue-Key'>
                <span>Width</span>
              </div>
              <div>
                <div className='KeyValue-Value descriptionWidth'>
                  {active.width}
                </div>
              </div>
            </div>

            <div className='KeyValue'>
              <div className='KeyValue-Key'>
                <span>Depth</span>
              </div>
              <div>
                <div className='KeyValue-Value descriptionWidth'>
                  {active.depth}
                </div>
              </div>
            </div>
          </div>

          <div className='subtitle' >
            <span>Color legend</span>
          </div>

          <div className='KeyValueList' >

            <div className='KeyValue'>
              <div className='KeyValue-Key' >
                <span className='ColorLegend SelectedBox' ></span>
              </div>
              <div>
                <div className='KeyValue-Value descriptionWidth'>Selected box</div>
              </div>
            </div>
            {legends}
          </div>

          <div className='title'>
            <span >View options</span>
          </div>

          <div className="ViewOptions">
            <VersioBool horizontalLabel label="Coloured boxes" value={boxesColored} onChange={setBoxesColored} />
          </div>

          <div className="ViewOptions">
            <VersioBool horizontalLabel label="Coloured levels" value={levelsColored} onChange={setLevelsColored} />
          </div>

          <div className="ViewOptions">
            <VersioBool horizontalLabel label="Boxing shade" value={shadows} onChange={setShadows} />
          </div>

          {/* used with old code to order the box according it's height */}
          {/* <div className="boxOrder">
            <VersioDropdown label="Boxing sort mechanism" value={sortType} onChange={setSortType} options={[{ key: "highInCenter", value: "highInCenter", text: "Height by size from center" }, { key: "random", value: "random", text: "Random" }, { key: "highToLow", value: "highToLow", text: "Height by size from edge" }]} />
          </div> */}

          <div className='title'>
            <span >Controls</span>
          </div>

          <div className='MouseClick'>
            <div>
              <div className='des'>Use mouse left click to move around the object </div>
            </div>
          </div>

          <div className='MouseClick'>
            <div>
              <div className='des'>Use mouse scroll to zoom in &#38; out</div>
            </div>
          </div>

          <div className='MouseClick'>
            <div>
              <div className='des'>Use mouse right click to move left, right, up &#38; down</div>
            </div>
          </div>

        </SplitViewLeft>

        <SplitViewRight width={SplitViewWidth}>
          <StateController state={loading ? "loading" : "ok"}>
            <div >
              <Canvas id="threeJS"
                style={{ height: "82.5vh", width: "100%", background: "#ffffff", overflow: "hidden", display: "block" }}
                camera={{ position: [visulaSettings.position.x, visulaSettings.position.y, visulaSettings.position.z] }} onCreated={({ gl }) => {
                  gl.shadowMap.enabled = true
                  gl.shadowMap.type = THREE.PCFShadowMap
                }}>
                <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                <ambientLight intensity={visulaSettings.ambientLight} />
                <directionalLight
                  intensity={visulaSettings.directionalLightOne}
                  position={[visulaSettings.directionalLightOnePosition.x, visulaSettings.directionalLightOnePosition.y, visulaSettings.directionalLightOnePosition.z]}
                />
                <directionalLight
                  intensity={visulaSettings.directionalLightTwo}
                  position={[visulaSettings.directionalLightTwoPosition.x, visulaSettings.directionalLightTwoPosition.y, visulaSettings.directionalLightTwoPosition.z]}
                />
                <directionalLight
                  intensity={visulaSettings.directionalLightThree}
                  position={[visulaSettings.directionalLightThreePosition.x, visulaSettings.directionalLightThreePosition.y, visulaSettings.directionalLightThreePosition.z]}
                  shadow-mapSize-height={2048}
                  shadow-mapSize-width={2048}
                  shadow-camera-left={-visulaSettings.sizes.width}
                  shadow-camera-right={visulaSettings.sizes.width}
                  shadow-camera-top={visulaSettings.sizes.depth}
                  shadow-camera-bottom={-visulaSettings.sizes.depth}
                  castShadow={shadows}
                />
                {mainLevel}
                {levels}
              </Canvas>
            </div>
          </StateController>
        </SplitViewRight>
      </SplitView>
    </div>
  );
};

function MainLevel({ size, levPos }) {
  return (
    <mesh
      position={[-citymapConfiguration.levelsPaddingSize, levPos - 0.18, -citymapConfiguration.levelsPaddingSize]}
      castShadow={true}
      receiveShadow={true}
    >
      <boxGeometry args={[size.width, 0.15, size.depth]} />
      <meshStandardMaterial
        color={'#aaaaaa'}
      // metalness={0.1}
      // roughness={0.1}
      />
    </mesh>
  );
}
