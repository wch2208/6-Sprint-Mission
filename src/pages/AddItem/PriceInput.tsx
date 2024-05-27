import { PLACEHOLDER } from "../../constants/placeholder";
import styles from "./AddItem.module.css";
import { handleInputChange } from "../../utils/handleInputChange";

const PriceInput = ({ setValues, price }) => {
  return (
    <div>
      <p className={styles.titleForms}>판매 가격</p>
      <input
        name="price"
        placeholder={PLACEHOLDER.price}
        onChange={handleInputChange(setValues)}
        value={price}
      />
    </div>
  );
};

export default PriceInput;
