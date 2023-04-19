import { List, Select, Typography } from 'antd';
import { memo, useCallback, useRef, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import styled, { css } from 'styled-components';

import { EnvironmentOutlined, SearchOutlined } from '@ant-design/icons';
import request from '@lib/request';
import { activeItemIdState } from '@recoil/common';

const SearchStyle = styled.div<{ active?: boolean }>`
  position: absolute;
  width: 300px;
  top: 16px;
  left: 16px;
  z-index: 2;
  border-radius: 8px;
  overflow: hidden;

  ${(p) =>
    p.active &&
    css`
      .ant-input-group-wrapper {
      }
    `}
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ListItemStyle = styled(List.Item)`
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 8px 16px;

  &:hover {
    background-color: #f0f0f0;
  }
`;

interface Props {
  onSelect?(value: string): void;
}
export const Search = memo<Props>((props) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<CompanyType[]>();
  const setActiveItemId = useSetRecoilState(activeItemIdState);

  const controller = useRef<AbortController>();

  const handleSearch = useCallback(async (text: string) => {
    if (controller.current) {
      controller.current.abort();
    }

    controller.current = new AbortController();

    try {
      setLoading(true);
      const resp = await request<CompanyType[]>(`/api/search?q=${text}`, {
        signal: controller.current.signal,
      });

      setOptions(resp);
    } catch (e: any) {
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      <SearchStyle>
        <Select
          showSearch
          placeholder="Search..."
          defaultActiveFirstOption={false}
          showArrow={false}
          filterOption={false}
          onSearch={handleSearch}
          onChange={setActiveItemId}
          notFoundContent={null}
          style={{ width: '100%' }}
          size="large"
          suffixIcon={<SearchOutlined />}
          loading={loading}
          optionLabelProp="label"
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
      </SearchStyle>
    </>
  );
});
