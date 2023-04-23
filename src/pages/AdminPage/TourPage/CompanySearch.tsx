import { Divider, Image, Select, Typography } from 'antd';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
  EnvironmentOutlined,
  PhoneOutlined,
  SearchOutlined
} from '@ant-design/icons';
import request from '@lib/request';

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Gallery = styled.div`
  display: flex;
  flex-wrap: wrap;

  .ant-image {
    flex-basis: 50%;
    padding: 2px;
  }
`;

interface Props {
  defaultValue?: CompanyType;
  onSelect?(value: string): void;
}
export const CompanySearch = memo<Props>(({ onSelect, ...props }) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<CompanyType[]>([]);
  const [selected, setSelected] = useState<CompanyType | undefined>(
    props.defaultValue
  );

  const controller = useRef<AbortController>();

  const handleSearch = useCallback(async (text: string) => {
    if (controller.current || !text) {
      controller.current?.abort();
    }

    controller.current = new AbortController();

    try {
      setLoading(true);
      const resp = await request<CompanyType[]>(
        `/api/search?q=${text}&type=agency`,
        {
          signal: controller.current.signal,
        }
      );

      setOptions(resp);
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      setSelected(options?.find((i) => i.id === id));

      onSelect?.(id);
    },
    [onSelect, options]
  );

  useEffect(() => {
    if (!selected && props.defaultValue) {
      setSelected(props.defaultValue);
    }

    if (options.length == 0 && props.defaultValue) {
      setOptions([props.defaultValue]);
    }
  }, [props.defaultValue]);

  return (
    <>
      <Select
        showSearch
        placeholder="Search..."
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={handleSearch}
        onChange={handleSelect}
        notFoundContent={null}
        style={{ width: '100%' }}
        suffixIcon={<SearchOutlined />}
        loading={loading}
        optionLabelProp="label"
        defaultValue={props.defaultValue?.id}
      >
        {options?.map((i) => (
          <Select.Option key={i.id} value={i.id} label={i.name}>
            <OptionItem>
              <EnvironmentOutlined />
              <Typography.Text>
                <strong>{i.name}</strong>
              </Typography.Text>
            </OptionItem>
          </Select.Option>
        ))}
      </Select>

      {selected && (
        <>
          <Divider />
          <Typography.Title level={5}>Name: {selected?.name}</Typography.Title>
          <Typography.Paragraph>{selected?.synopsis}</Typography.Paragraph>
          <Typography.Paragraph>
            <PhoneOutlined /> {selected?.tel}
          </Typography.Paragraph>
          <Typography.Paragraph>
            <EnvironmentOutlined /> {selected?.address}
          </Typography.Paragraph>

          <Gallery>
            {selected.photos.map((url, index) => (
              <Image key={`${url}-${index}`} src={url} alt={selected.name} />
            ))}
          </Gallery>
        </>
      )}
    </>
  );
});
