import React from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import Button from "@material-ui/core/Button";

const Tier = props => {
  const formData = {
    2: {
      name: "monkey",
      code: "pm",
      item: "Powder Monkey"
    },
    4: {
      name: "mate",
      code: "fm",
      item: "First Mate"
    },
    8: {
      name: "captain",
      code: "capt",
      item: "Captain"
    }
  };
  const form = formData[props.tier];
  const styles = {
    box: {
      color: "#fff",
      borderRadius: "6px",
      padding: "2rem",
      marginBottom: "1rem",
      textAlign: "center",
    },
    price: {
      fontSize: "4rem",
      fontWeight: 900,
      lineHeight: 0.8,
    }
  }

  if (props.tier === 0) delete styles.box.color;
  else if (props.tier === 2) styles.box.backgroundColor = "#37b24d";
  else if (props.tier === 4) styles.box.backgroundColor = "#228be6";
  else if (props.tier === 8) styles.box.backgroundColor = "#7950f2";
  return (
      <div style={styles.box} id={"tier-"+props.tier} className="shadow">
          <div style={styles.price}>{props.tier}€</div>
          <div>
            <FormattedMessage id="app.perMonth" />
          </div>
        <p>
          <FormattedHTMLMessage id={"app.txt-tier" + props.tier} />
        </p>
        {props.tier > 0 ? (
          <div>
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
              id={"form-patron-" + form.name}
            >
              <input type="hidden" name="cmd" value="_xclick-subscriptions" />
              <input
                type="hidden"
                name="business"
                value="info@freesewing.org"
              />
              <input type="hidden" name="lc" value="BE" />
              <input
                type="hidden"
                name="item_name"
                value={"Freesewing Patron - " + form.item}
              />
              <input
                type="hidden"
                name="item_number"
                value={"patron-" + form.code}
              />
              <input type="hidden" name="no_note" value="1" />
              <input type="hidden" name="no_shipping" value="2" />
              <input type="hidden" name="rm" value="1" />
              <input
                type="hidden"
                name="return"
                value={
                  "https://freesewing.org/" +
                  props.language +
                  "/patrons/thank-you"
                }
              />
              <input type="hidden" name="src" value="1" />
              <input type="hidden" name="a3" value={props.tier + ".00"} />
              <input type="hidden" name="p3" value="1" />
              <input type="hidden" name="t3" value="M" />
              <input type="hidden" name="currency_code" value="EUR" />
              <input
                type="hidden"
                name="bn"
                value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHosted"
              />
              <input
                type="hidden"
                name="image_url"
                value="https://data.freesewing.org/static/img/paypal-logo.png"
              />
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
              >
                <FormattedMessage id="app.subscribe" />
              </Button>
            </form>
            <form
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
              target="_top"
              id={"form-patron-" + form.name + "-yearly"}
            >
              <input type="hidden" name="cmd" value="_xclick-subscriptions" />
              <input
                type="hidden"
                name="business"
                value="info@freesewing.org"
              />
              <input type="hidden" name="lc" value="BE" />
              <input
                type="hidden"
                name="item_name"
                value={"Freesewing Patron - " + form.item + " - Yearly"}
              />
              <input
                type="hidden"
                name="item_number"
                value={"patron-" + form.code}
              />
              <input type="hidden" name="no_note" value="1" />
              <input type="hidden" name="no_shipping" value="2" />
              <input type="hidden" name="rm" value="1" />
              <input
                type="hidden"
                name="return"
                value={
                  "https://freesewing.org/" +
                  props.language +
                  "/patrons/thank-you"
                }
              />
              <input type="hidden" name="src" value="1" />
              <input type="hidden" name="a3" value={props.tier * 12 + ".00"} />
              <input type="hidden" name="p3" value="1" />
              <input type="hidden" name="t3" value="Y" />
              <input type="hidden" name="currency_code" value="EUR" />
              <input
                type="hidden"
                name="bn"
                value="PP-SubscriptionsBF:btn_subscribeCC_LG.gif:NonHosted"
              />
              <input
                type="hidden"
                name="image_url"
                value="https://data.freesewing.org/static/img/paypal-logo.png"
              />
              <Button
                color="secondary"
                size="small"
                type="submit"
                variant="text"
              >
                <FormattedMessage id="app.orPayPerYear" />
              </Button>
            </form>
          </div>
        ) : (
          ""
        )}
      </div>
  );
};

export default Tier;
