import { Button } from '@/components/ui/Button'
import { PiTrash } from 'react-icons/pi'
import React from 'react'
//@ts-ignore
import { MediaRenderer } from "@thirdweb-dev/react";

const getGridRows = (attachments: number) => {
  if (attachments > 2) {
    return 'grid grid-flow-col grid-cols-2 grid-rows-2 gap-1 pt-3'
  } else {
    return 'grid grid-flow-col grid-cols-2 grid-rows-1 gap-1 pt-3'
  }
}
const stopEventPropagation = (event: any) => event?.stopPropagation();

interface Props {
  attachments: any
  setAttachments?: any
  isNew?: boolean
  altName: string
}


const Attachments: React.FC<Props> = ({
  attachments,
  setAttachments,
  isNew = false,
  altName
}) => {
  const removeAttachment = (attachment: any) => {
    const arr = attachments
    setAttachments(
      arr.filter(function (ele: any) {
        return ele != attachment
      })
    )
  }

  return (
    <>
      {attachments?.length !== 0 && (
        <div className={getGridRows(attachments?.length)}>
          {attachments?.slice(0,3).map((attachment: any) => (
            <div
              className="aspect-w-16 aspect-h-12"
              key={
                isNew ? attachment.item : attachment.original.url
              }
              onClick={(event) => stopEventPropagation(event)}
            >
                <MediaRenderer
                    src={ attachment.original.url }
                    alt={ altName }
                    className="object-fill bg-gray-100 border rounded-lg dark:bg-gray-800 dark:border-gray-800"
                    width="fit-content"
                    height="fit-content"
                    min-height="40px"
                    min-width="40px"
                />
                {isNew && (
                    <div className="m-3">
                    <Button
                        variant="danger"
                        icon={<PiTrash className="w-4 h-4" />}
                        onClick={() => removeAttachment(attachment)}
                    />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default Attachments
