import { Button, Checkbox, ConfigProvider, message, Pagination, Popconfirm, Table, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, PaperClipOutlined, EyeOutlined } from "@ant-design/icons";
import React from 'react'
import { get } from 'lodash';
import { useHooks } from 'hooks';

const index = ({
    items,
    meta,
    isLoading,
    hasPagination = false,
    customPagination = false,
    columns,
    hasDelete = false,
    hasUpdate = false,
    hasContent = false,
    deleteAction = () => { },
    updateAction = () => { },
    contentAction = () => { }
}) => {

    const { navigate, qs, params } = useHooks()

    const cancel = (e) => {
        message.error("Ushbu ma'lumot o'chirilmadi");
    };

    const newColumns = hasDelete || hasUpdate ? [
        ...columns,
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, row) => {
                return (
                    <div className='flex gap-4'>
                        {
                            hasDelete ? (
                                <Tooltip placement='left' title={"O'chirish"}>
                                    <Popconfirm
                                        placement="topRight"
                                        title={"O'chirish"}
                                        description={"O'chirishni xoxlaysizmi?"}
                                        onConfirm={() => deleteAction(row)}
                                        onCancel={cancel}
                                        okText="Ha"
                                        cancelText="Yo'q"
                                    >
                                        <Button danger>
                                            <DeleteOutlined
                                                className="text-red-500 cursor-pointer text-lg"
                                            />
                                        </Button>
                                    </Popconfirm>
                                </Tooltip>
                            ) : null
                        }
                        {
                            hasUpdate ? (
                                <Tooltip placement='topLeft' title={"O'zgartirish"}>
                                    <Button >
                                        <EditOutlined
                                            className="text-blue-500 cursor-pointer text-lg"
                                            onClick={() => updateAction(row)}
                                        />
                                    </Button>
                                </Tooltip>
                            ) : null
                        }
                        {
                            hasContent ? (
                                <Tooltip placement='topLeft' title={"Contentni ko'rish"}>
                                    <EyeOutlined
                                        className="text-green-500 cursor-pointer text-lg"
                                        // onClick={() => navigate(`/posts/post-content/${get(row, "id")}`)}
                                        onClick={() => contentAction(row)}
                                    />
                                </Tooltip>
                            ) : null
                        }
                    </div>
                )
            }
        },
    ] : columns
    return (
        <>
            <ConfigProvider
                // theme={{
                //     token: {
                //         colorPrimary: "#107C7F",
                //         colorTextBase: "white",
                //         colorTextLightSolid: "black",
                //         colorBgBase: "black"
                //     }
                // }}
            >
                <Table
                    columns={newColumns}
                    dataSource={items}
                    loading={isLoading}
                    rowKey={"id"}
                    className={"overflow-x-auto"}
                    pagination={hasPagination ? {
                        total: get(meta, "total"),
                        offset: +get(params, "offset", 1),
                        pageSize: get(meta, "perPage", 1)
                    } : false}
                    onChange={(page) => {
                        navigate({
                            search: qs.stringify({
                                ...params,
                                page: page.current,
                            }),
                        });
                    }}
                />
            </ConfigProvider>
            {
                !hasPagination && customPagination ?
                    <div className="flex justify-end my-3">
                        <Pagination
                            total={get(meta, "total")}
                            offset={+get(params, "offset", 1)}
                            pageSize={get(meta, "perPage", 1)}
                            onChange={(page) => {
                                navigate({
                                    search: qs.stringify({
                                        ...params,
                                        page: page,
                                    }),
                                });
                            }}
                        />
                    </div>
                    : null}
        </>
    )
}

export default index