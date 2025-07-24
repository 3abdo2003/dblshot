import React from 'react';

function CampaignForm({ values, onChange, templates }) {
  return (
    <form className="campaign-form">
      <label>
        Campaign Title
        <input
          type="text"
          name="title"
          value={values.title}
          onChange={onChange}
          placeholder="Enter campaign title"
        />
      </label>
      <label>
        Hero Image URL
        <input
          type="text"
          name="heroImage"
          value={values.heroImage}
          onChange={onChange}
          placeholder="Paste image URL"
        />
      </label>
      <label>
        CTA Text
        <input
          type="text"
          name="cta"
          value={values.cta}
          onChange={onChange}
          placeholder="e.g. Sign up now"
        />
      </label>
      <label>
        Body / Product Description
        <textarea
          name="body"
          value={values.body}
          onChange={onChange}
          placeholder="Describe your product or campaign"
        />
      </label>
      <label>
        Theme Color (optional)
        <input
          type="color"
          name="themeColor"
          value={values.themeColor}
          onChange={onChange}
        />
      </label>
      <label>
        Template
        <select name="template" value={values.template} onChange={onChange}>
          {templates.map((tpl) => (
            <option key={tpl.value} value={tpl.value}>{tpl.label}</option>
          ))}
        </select>
      </label>
    </form>
  );
}

export default CampaignForm; 