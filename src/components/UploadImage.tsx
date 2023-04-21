import { Modal, Upload } from 'antd';
import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Upload as UploadJS } from 'upload-js';

import { PlusOutlined } from '@ant-design/icons';
import { appconfig } from '@lib/appconfig';

import type { RcFile } from 'antd/es/upload';
import type {
  UploadChangeParam,
  UploadFile,
  UploadFileStatus,
} from 'antd/es/upload/interface';

const upload = UploadJS({ apiKey: appconfig.uploadIOKey ?? '' });

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

interface Props {
  value?: string[];
  onChange?(value: string[]): void;
}

export const UploadImage = memo<Props>(({ onChange, ...props }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1)
    );
  };

  const handleChange = useCallback(
    (info: UploadChangeParam<UploadFile<{ fileUrl: string }>>) => {
      const urls: string[] = [];
      info.fileList.forEach((f) => {
        if (f.response?.fileUrl) urls.push(f.response.fileUrl);
      });

      onChange?.(urls);
      setFileList(info.fileList);
    },
    [onChange]
  );

  const customRequest = useCallback(async (options: any) => {
    try {
      const resp = await upload.uploadFile(options.file);

      options.onSuccess(resp);
    } catch (e: any) {
      options.onError(e, options.file);
    }
  }, []);

  const uploadButton = useMemo(
    () => (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    ),
    []
  );

  useEffect(() => {
    if (fileList.length === 0 && props.value && props.value?.length > 0) {
      setFileList(
        props.value?.map((url) => ({
          uid: url,
          name: url,
          url: url,
          status: 'done' as UploadFileStatus,
        }))
      );
    }
  }, [props.value]);

  return (
    <>
      <Upload
        listType="picture-card"
        name="file"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        customRequest={customRequest}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
});
