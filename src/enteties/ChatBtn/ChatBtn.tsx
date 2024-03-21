import { Button } from '@mantine/core';
import { IconMessageCircle2 } from '@tabler/icons-react';
import s from './ChatBtn.module.scss';
import { useTranslation } from 'react-i18next';

const ChatBtn: React.FC<{ setOpen: React.Dispatch<React.SetStateAction<boolean>>; }> = ({ setOpen }) => {
    const { t } = useTranslation();

    return (
        <div className={s.chatbtn}>
            <Button
                justify="center"
                leftSection={<IconMessageCircle2 />}
                variant="fiiled"
                mt="md"
                radius="xl"
                onClick={() => setOpen(state => !state)}
            >
                {t("chatbtn.title")}
            </Button>
        </div>
    )
}

export default ChatBtn;