import { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, List } from "react-native-paper";

import theme from "../../theme";

const styles = StyleSheet.create({
  button: {
    padding: theme.padding.appBarTab,
    backgroundColor: theme.colors.greyBackground,
    textAlign: theme.textAlign.left,
  },
  dialog: {
    borderRadius: 0,
    backgroundColor: theme.colors.greyBackground,
  },
  dialogContent: {
    paddingHorizontal: 0,
  },
  listItem: {
    backgroundColor: theme.colors.greyBackground,
  },
  listItemText: {
    color: theme.colors.blackText,
    textAlign: theme.textAlign.left,
  },
});

const labelMappings = {
  latest: "Latest repositories",
  highest: "Highest rated repositories",
  lowest: "Lowest rated repositories",
};

const OrderPicker = ({ selectedValue, onValueChange }) => {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleSelect = (value) => {
    onValueChange(value);
    closeMenu();
  };

  return (
    <>
      <Button
        onPress={openMenu}
        style={styles.button}
        textColor={theme.colors.blackText}
        contentStyle={{ justifyContent: "flex-start" }}
      >
        {labelMappings[selectedValue]}
      </Button>
      <Portal>
        <Dialog
          visible={visible}
          onDismiss={closeMenu}
          style={styles.dialog}
          contentContainerStyle={styles.dialogContent}
        >
          <Dialog.Content>
            {Object.entries(labelMappings).map(([value, label]) => (
              <List.Item
                key={value}
                onPress={() => handleSelect(value)}
                title={label}
                titleStyle={styles.listItemText}
                style={styles.listItem}
              />
            ))}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </>
  );
};

export default OrderPicker;
