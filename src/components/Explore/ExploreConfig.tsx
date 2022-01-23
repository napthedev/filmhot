import { FC, useState } from "react";

import ExploreResult from "./ExploreResult";
import { SearchConfig } from "../../shared/types";

interface ExploreConfigProps {
  config: SearchConfig;
  sectionIndex: number;
}

const ExploreConfig: FC<ExploreConfigProps> = ({ config, sectionIndex }) => {
  const [configs, setConfigs] = useState(
    config.screeningItems.reduce((acc, current) => {
      acc[current.items[0].screeningType] = current.items[0].params;
      return acc;
    }, {})
  );

  const handleConfigChange = (name, value) => {
    const clone = JSON.parse(JSON.stringify(configs));

    clone[name] = value;

    setConfigs(clone);
  };

  return (
    <>
      <div className="flex gap-3 flex-wrap my-6">
        {config.screeningItems.map((section, index) => (
          <select
            className="outline-none bg-dark-lighten px-3 py-2 rounded"
            key={`${index}`}
            value={configs[section.items[0].screeningType]}
            onChange={(e) =>
              handleConfigChange(section.items[0].screeningType, e.target.value)
            }
          >
            {section.items.map((selection) => (
              <option
                className="outline-none bg-dark-lighten px-3 py-2"
                key={selection.params}
                value={selection.params}
              >
                {selection.name}
              </option>
            ))}
          </select>
        ))}
      </div>
      <ExploreResult
        params={config.params}
        configs={configs}
        sectionIndex={sectionIndex}
      />
    </>
  );
};

export default ExploreConfig;
