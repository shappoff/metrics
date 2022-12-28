import {CSSProperties, default as React} from 'react';
import Select from 'react-select';

import firebase from "firebase";

const {
    applicationID, adminAPIKey
} = env;

import BornMetrics from "./BornMetrics";
import MarriageMetrics from "./MarriageMetrics";
import DiedMetrics from "./DiedMetrics";

const algoliasearch = require("algoliasearch");

const client = algoliasearch(applicationID, adminAPIKey);

export interface ItemOption {
    readonly value: string;
    readonly label: string;
}

export const sennenskiyUezd: readonly ItemOption[] = [
    { value: 'molyavka', label: 'Молявковская Михайловская церковь'},
    { value: 'sloveny', label: 'Словенинская Петропавловская церковь'},
    { value: 'bobr', label: 'Бобрская святителя Николая церковь'},
];

export const lepelskiyUezd: readonly ItemOption[] = [
    { value: 'nizgolovo', label: 'Низголовская Иоанно-Предчетинская церковь' },
    { value: 'usaya', label: 'Усайская Покрова Пресвятой Богородицы церковь' },
    { value: 'hotino', label: 'Хотинская Святого Иосифа Обручника церковь' },
];

export interface GroupedOption {
    readonly label: string;
    readonly options: readonly ItemOption[];
}

export const groupedOptions: readonly GroupedOption[] = [
    {
        label: 'Сенненский уезд',
        options: sennenskiyUezd,
    },
    {
        label: 'Лепельский уезд',
        options: lepelskiyUezd,
    },
];
const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};
const groupBadgeStyles: CSSProperties = {
    backgroundColor: '#EBECF0',
    borderRadius: '2em',
    color: '#172B4D',
    display: 'inline-block',
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: '1',
    minWidth: 1,
    padding: '0.16666666666667em 0.5em',
    textAlign: 'center',
};

const formatGroupLabel = (data: GroupedOption) => (
    <div style={groupStyles}>
        <span>{data.label}</span>
        <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
);

const FindMetrics = () => {
    const [value, setValue] = React.useState<string>('');
    const [yearsFilter, setYearsFilter] = React.useState<Array<string>>([]);
    const [churches, setChurches] = React.useState<Array<string>>(['molyavka']);
    const [metricType, setMetricType] = React.useState<string>('born');

    const [hits, setHits] = React.useState<Array<any>>([]);
    const [facets, setFacets] = React.useState<any>({});
    const [currentAlgoliaIndex, setCurrentAlgoliaIndex] = React.useState(client.initIndex('born'));

    React.useEffect(() => {
        setCurrentAlgoliaIndex(client.initIndex(metricType));
    }, [metricType]);

    const searchHandler = ({target}: any) => {
        setValue(target.value);
    }

    const keysHandler = (e: any) => {
        if (e.which == 27) {
            setValue('');
            setHits([]);
        }
    };

    const churchHandler = (e: any) => {
        setHits([]);
        setChurches(e.map(({value}: any) => value));
    }

    const metricTypeRadioHandler = ({currentTarget}: any) => {
        setHits([]);
        setMetricType(currentTarget.value);
    }

    React.useEffect(() => {
        currentAlgoliaIndex.search('', {
            hitsPerPage: 0,
            facets: ["*"],
            facetFilters: [
                [...churches.map((year) => `church:${year}`)],
            ]
        })
            .then(({facets}: any) => {
                setYearsFilter(Object.keys(facets.year) as Array<string>);
                setFacets(facets);
            });
    }, [churches]);

    React.useEffect(() => {
        value.length && currentAlgoliaIndex.search(value, {
            facetFilters: [
                [...churches.map((year) => `church:${year}`)],
                [...yearsFilter.map((year) => `year:${year}`)]
            ]
        })
            .then(({hits, facets}: any) => {
                setHits(hits);
            });
    }, [currentAlgoliaIndex, yearsFilter, value]);

    const yearClickHandler = (e: any) => {
        if (e.target.checked) {
            setYearsFilter([...yearsFilter, e.target.value])
        } else {
            setYearsFilter(yearsFilter.filter((item: any) => item !== e.target.value));
        }
    };

    return (
        <>
            <Select<ItemOption, true, GroupedOption>
                defaultValue={sennenskiyUezd[0]}
                isMulti
                options={groupedOptions}
                formatGroupLabel={formatGroupLabel}
                onChange={churchHandler}
            />
            <div className="type-table">
                <div className="form-check form-check-inline">
                    <input className="form-check-input" defaultChecked type="radio" name="type" id="born" value="born" onChange={metricTypeRadioHandler} />
                    <label className="form-check-label" htmlFor="born">О рождении</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="type" id="marriage" value="marriage" onChange={metricTypeRadioHandler} />
                    <label className="form-check-label" htmlFor="marriage">О бракосочетавшихся</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="type" id="died" value="died" onChange={metricTypeRadioHandler} />
                    <label className="form-check-label" htmlFor="died">О умерших</label>
                </div>
            </div>

            <div className="years-facets">
                {
                    facets && facets.year && Object.keys(facets.year).map((year, index) =>
                        <div key={index + 'facet'} className="form-check form-check-inline">
                            <input
                                defaultChecked
                                onChange={yearClickHandler}
                                value={year} id={index + ''}
                                className="form-check-input" type="checkbox" />
                            <label className="form-check-label" htmlFor={index + ''}>{year}</label>
                        </div>
                    )
                }
            </div>
            <input autoFocus onInput={searchHandler} onChange={keysHandler} type="text" value={value} id="input"/>
            {
                hits.length && metricType === 'born' ? <BornMetrics hits={hits} churches={churches} yearsFilter={yearsFilter} /> : ''
            }
            {
                hits.length && metricType === 'marriage' ? <MarriageMetrics hits={hits} churches={churches} yearsFilter={yearsFilter} /> : ''
            }
            {
                hits.length && metricType === 'died' ? <DiedMetrics hits={hits} churches={churches} yearsFilter={yearsFilter} /> : ''
            }

        </>
    );
};

export default FindMetrics;